import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const sections = [...footer.children];
  const signup = sections.find((section) => section.textContent.includes('Sign up for deals'));
  const links = sections.find((section) => section.textContent.includes('Customer Service'));
  const legal = sections.find((section) => section.textContent.includes('All rights reserved'));
  const directory = sections.find((section) => section.textContent.includes('View all products by'));
  signup?.classList.add('footer-signup');
  links?.classList.add('footer-links');
  legal?.classList.add('footer-legal');
  directory?.classList.add('footer-directory');

  const signature = legal?.querySelector('p:first-child');
  if (signature && links) {
    signature.classList.add('footer-signature');
    links.querySelector('.default-content-wrapper')?.prepend(signature);
  }

  block.append(footer);
}
