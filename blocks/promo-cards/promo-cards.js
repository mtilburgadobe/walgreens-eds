import addMobileDamRendition from '../../scripts/walgreens-images.js';

function mediaFrom(cell) {
  if (!cell) return null;
  return cell.matches('picture, img') ? cell : cell.querySelector('picture, img');
}

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;
    const item = document.createElement('li');
    const media = addMobileDamRendition(cells.map(mediaFrom).find(Boolean));
    const body = document.createElement('div');
    body.className = 'promo-card';
    if (media) {
      const mediaWrap = document.createElement('div');
      mediaWrap.className = 'promo-card-media';
      mediaWrap.append(media);
      body.append(mediaWrap);
    }
    const copy = document.createElement('div');
    copy.className = 'promo-card-copy';
    cells.forEach((cell) => {
      [...cell.children].forEach((node) => {
        if (node === media || node.contains(media)) return;
        copy.append(node);
      });
    });
    if (copy.childNodes.length) body.append(copy);
    item.append(body);
    list.append(item);
  });
  if (list.children.length) block.replaceChildren(list);
}
