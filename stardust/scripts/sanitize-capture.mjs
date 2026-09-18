#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const check = args.includes('--check');
const files = args.filter((arg) => arg !== '--check');

if (!files.length) {
  process.stderr.write('usage: sanitize-capture.mjs [--check] <file> [...files]\n');
  process.exit(2);
}

const REDACTION = '[REDACTED]';
const patterns = [
  {
    name: 'Google API key',
    find: /AIza[0-9A-Za-z_-]{35}/g,
    replace: REDACTION,
  },
  {
    name: 'named API credential',
    find: /(["'](?:apiKey|env_google_api|google_places_api)["']\s*:\s*["'])(?!\[REDACTED\])[^"']+(["'])/g,
    replace: `$1${REDACTION}$2`,
  },
  {
    name: 'opaque 32-character key',
    find: /(["']key["']\s*:\s*["'])(?!\[REDACTED\])[0-9A-Za-z_-]{32}(["'])/g,
    replace: `$1${REDACTION}$2`,
  },
];

let findings = 0;

for (const file of files) {
  const source = await readFile(file, 'utf8');
  let sanitized = source;
  const counts = [];

  patterns.forEach(({ name, find, replace }) => {
    let count = 0;
    sanitized = sanitized.replace(find, (...match) => {
      count += 1;
      return typeof replace === 'function' ? replace(...match) : match[0].replace(find, replace);
    });
    if (count) counts.push(`${name}: ${count}`);
    findings += count;
  });

  if (counts.length) {
    process.stderr.write(`${file}: ${counts.join(', ')}\n`);
    if (!check) await writeFile(file, sanitized);
  }
}

if (check && findings) process.exit(1);
