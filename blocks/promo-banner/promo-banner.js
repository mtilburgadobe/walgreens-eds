import addMobileDamRendition from '../../scripts/walgreens-images.js';

function findMedia(cell) {
  if (!cell) return null;
  return cell.matches('picture, img') ? cell : cell.querySelector('picture, img');
}

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const media = addMobileDamRendition(cells.map(findMedia).find(Boolean));
  const heading = block.querySelector('h1, h2');
  const paragraphs = [...block.querySelectorAll('p')];
  const action = paragraphs.find((p) => p.querySelector('a'));
  const copy = paragraphs.find((p) => p !== action && !p.querySelector('picture, img'));

  const frame = document.createElement('div');
  frame.className = 'promo-banner-frame';
  const content = document.createElement('div');
  content.className = 'promo-banner-content';

  if (media) {
    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'promo-banner-media';
    mediaWrap.append(media);
    frame.append(mediaWrap);
    const img = media.matches('img') ? media : media.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
  }
  if (heading) content.append(heading);
  if (copy) content.append(copy);
  if (action) {
    const actions = document.createElement('div');
    actions.className = 'promo-banner-actions';
    actions.append(action);
    content.append(actions);
  }
  frame.append(content);
  block.replaceChildren(frame);
}
