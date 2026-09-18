export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const media = row.querySelector('picture, img');
    const item = document.createElement('li');
    const card = document.createElement('div');
    if (media) card.append(media);
    [...row.children].forEach((cell) => {
      [...cell.children].forEach((node) => {
        if (node === media || node.contains(media)) return;
        card.append(node);
      });
    });
    item.append(card);
    list.append(item);
  });
  if (list.children.length) block.replaceChildren(list);
}
