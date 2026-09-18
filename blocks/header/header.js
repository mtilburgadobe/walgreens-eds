import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const mobile = window.matchMedia('(max-width: 899px)');

function setExpanded(nav, expanded) {
  nav.setAttribute('aria-expanded', String(expanded));
  const button = nav.querySelector('.nav-toggle');
  if (button) {
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  }
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Primary');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  ['utility', 'brand', 'sections', 'tools', 'quick'].forEach((name, index) => {
    if (nav.children[index]) nav.children[index].classList.add(`nav-${name}`);
  });

  const brandLink = nav.querySelector('.nav-brand a');
  if (brandLink) {
    brandLink.className = 'nav-logo';
    brandLink.closest('p')?.classList.remove('button-wrapper');
  }

  const searchHost = nav.querySelector('.nav-tools p:first-of-type');
  if (searchHost) {
    const label = searchHost.textContent.trim() || 'Search';
    searchHost.textContent = '';
    const search = document.createElement('input');
    search.type = 'search';
    search.setAttribute('aria-label', 'Search Walgreens');
    search.placeholder = label;
    searchHost.append(search);
  }

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-controls', 'nav');
  toggle.innerHTML = '<span aria-hidden="true"></span>';
  toggle.addEventListener('click', () => setExpanded(nav, nav.getAttribute('aria-expanded') !== 'true'));
  nav.prepend(toggle);

  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setExpanded(nav, false);
  });
  mobile.addEventListener('change', () => setExpanded(nav, false));
  setExpanded(nav, false);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
}
