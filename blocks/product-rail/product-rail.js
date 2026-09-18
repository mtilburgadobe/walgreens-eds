function mediaFrom(cell) {
  if (!cell) return null;
  return cell.matches('picture, img') ? cell : cell.querySelector('picture, img');
}

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const item = document.createElement('li');
    const media = [...row.children].map(mediaFrom).find(Boolean);
    if (media) {
      const mediaWrap = document.createElement('div');
      mediaWrap.className = 'product-rail-media';
      mediaWrap.append(media);
      item.append(mediaWrap);
    }
    const copy = document.createElement('div');
    copy.className = 'product-rail-copy';
    [...row.children].forEach((cell) => {
      [...cell.children].forEach((node) => {
        if (node === media || node.contains(media)) return;
        copy.append(node);
      });
    });
    if (copy.childNodes.length) item.append(copy);
    list.append(item);
  });
  if (list.children.length) block.replaceChildren(list);
}
