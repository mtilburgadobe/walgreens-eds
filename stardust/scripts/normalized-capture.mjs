#!/usr/bin/env node

import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { chromium } from 'playwright';
import {
  dismissOverlays,
  gotoLive,
  newLiveContext,
} from './diff/live-session.mjs';

async function normalize(page) {
  return page.evaluate(() => {
    const hide = (element) => {
      if (element) element.style.setProperty('display', 'none', 'important');
    };

    [
      '#hp-gam-banner',
      '#offers-for-you-container',
      '.kampyle_vertical_button',
      '[class*="kampyle"]',
      '[id*="survey"]',
      '[class*="survey"]',
      '#onetrust-consent-sdk',
      '.modal',
      '.overlay',
    ].forEach((selector) => document.querySelectorAll(selector).forEach(hide));

    [...document.querySelectorAll('h2, h3')].forEach((heading) => {
      if (heading.textContent.trim() !== 'Offers just for you') return;
      hide(heading.closest('main > .section, .hpcontainer, [id*="personal"]'));
    });

    const dynamicSurfaces = [
      {
        name: 'beauty-coupons',
        source: '#hp-beauty-coupon-carousel-container',
        candidate: '.product-rail.coupons',
      },
      {
        name: 'halloween-commerce',
        source: '#halloween-carousel-container',
        candidate: '.product-rail.halloween-products',
      },
      {
        name: 'deals-of-the-week',
        source: '#dotw-dynamic-carousel-container',
        candidate: '.product-rail.deals',
      },
    ];
    const normalized = dynamicSurfaces.map((surface) => {
      const source = document.querySelector(surface.source);
      const candidate = document.querySelector(surface.candidate);
      const candidateContainer = surface.name === 'beauty-coupons'
        ? candidate?.closest('.product-rail-wrapper')
        : candidate?.closest('.section');
      const extra = surface.name === 'beauty-coupons'
        ? candidate?.closest('.section')?.querySelector('.promo-cards-wrapper ~ .default-content-wrapper')
        : null;
      const containers = [source, candidateContainer, extra].filter(Boolean);
      const spacerHeight = candidate && surface.name === 'deals-of-the-week'
        ? (window.innerWidth <= 640 ? 20 : 49)
        : 0;
      const before = document.documentElement.scrollHeight;
      if (spacerHeight) {
        const spacer = document.createElement('div');
        spacer.dataset.normalizedSpacer = surface.name;
        spacer.style.height = `${spacerHeight}px`;
        candidateContainer.before(spacer);
      }
      containers.forEach(hide);
      const after = document.documentElement.scrollHeight;
      return {
        name: surface.name,
        side: source ? 'source' : candidate ? 'candidate' : 'missing',
        found: containers.length > 0,
        removedHeight: before - after,
        spacerHeight,
      };
    });

    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('*').forEach((element) => {
      element.style.setProperty('animation', 'none', 'important');
      element.style.setProperty('transition', 'none', 'important');
    });
    const landmarkLabels = [
      'Because your health matters',
      'Beauty Savings Event',
      'Fall well-being refresh',
      'Save every smile',
      'Shop all Halloween',
      'Explore more',
      'Featured categories',
      'Sign up for deals and offers',
    ];
    const landmarks = Object.fromEntries(landmarkLabels.map((label) => {
      const element = [...document.querySelectorAll('h1, h2, h3, p, a')]
        .find((candidate) => candidate.textContent.trim().includes(label)
          && candidate.getBoundingClientRect().height > 0);
      return [label, element
        ? Math.round(element.getBoundingClientRect().top + window.scrollY)
        : null];
    }));
    const imageLabels = [
      'HealthModule_Image_Card1',
      'EnterpriseA_Image_Card1',
      'EnterpriseB_Image_Card1',
      'EnterpriseB_Image_Card2',
      'Photo_Image_Card1',
      'Photo_Image_Card2',
      'Halloween_Image_SlimBanner',
      'Tertiary_Image_Card_2',
      'FeaturedCategories_GroupIcon_Category1',
    ];
    const images = Object.fromEntries(imageLabels.map((label) => {
      const image = [...document.images].find((candidate) => candidate.currentSrc.includes(label)
        && candidate.getBoundingClientRect().height > 0);
      if (!image) return [label, null];
      const rect = image.getBoundingClientRect();
      return [label, {
        y: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
      }];
    }));
    return { surfaces: normalized, landmarks, images };
  });
}

async function settleLazyContent(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => { setTimeout(resolve, 80); });
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

async function capture(browser, url, output, width, requiredSelector) {
  const viewportHeight = width <= 640 ? 800 : 900;
  const context = await newLiveContext(browser, {
    locale: 'en-US',
    viewport: { width, height: viewportHeight },
  });
  await context.route(/doubleclick|criteo|kampyle|medallia|survey|googlesyndication/i, (route) => route.abort());
  const page = await context.newPage();
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await gotoLive(page, url, { waitUntil: 'domcontentloaded', settleMs: 3000 });
    await dismissOverlays(page, { lateWindowMs: 3500 });
    await settleLazyContent(page);
    const requiredVisible = !requiredSelector || await page.locator(requiredSelector).evaluate((element) => (
      element.getBoundingClientRect().height > 300 && element.textContent.trim().length > 0
    )).catch(() => false);
    if (requiredVisible) break;
    if (attempt === 3) throw new Error(`required stable module unavailable: ${requiredSelector}`);
  }
  const normalized = await normalize(page);
  await page.waitForTimeout(500);
  await mkdir(dirname(output), { recursive: true });
  await page.screenshot({ path: output, fullPage: true, animations: 'disabled' });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`normalized ${output}: ${width}x${height} ${JSON.stringify(normalized)}`);
  await context.close();
  return { ...normalized, height };
}

const args = process.argv.slice(2);
const browser = await chromium.launch();
if (args[0] === '--pair') {
  const [, sourceUrl, candidateUrl, outputDir, widthArg = '1440'] = args;
  if (!sourceUrl || !candidateUrl || !outputDir) {
    console.error('Usage: node normalized-capture.mjs --pair <source> <candidate> <out-dir> [width]');
    process.exit(1);
  }
  const width = Number.parseInt(widthArg, 10);
  const requiredSelector = width <= 640 ? '#halloween-carousel-container' : null;
  const source = await capture(browser, sourceUrl, `${outputDir}/source.png`, width, requiredSelector);
  const candidate = await capture(browser, candidateUrl, `${outputDir}/candidate.png`, width);
  for (const surface of source.surfaces) {
    const counterpart = candidate.surfaces.find(({ name }) => name === surface.name);
    if (!surface.found || surface.side !== 'source'
      || !counterpart?.found || counterpart.side !== 'candidate') {
      throw new Error(`asymmetric dynamic normalization: ${surface.name}`);
    }
  }
} else {
  const [url, output, widthArg = '1440'] = args;
  if (!url || !output) {
    console.error('Usage: node normalized-capture.mjs <url> <out.png> [width]');
    process.exit(1);
  }
  await capture(browser, url, output, Number.parseInt(widthArg, 10));
}
await browser.close();
