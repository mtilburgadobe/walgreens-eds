import addMobileDamRendition from '../../scripts/walgreens-images.js';

function mediaFrom(cell) {
  if (!cell) return null;
  return cell.matches('picture, img') ? cell : cell.querySelector('picture, img');
}

function decorateCouponCarousel(block, list) {
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Beauty deals you’ll love carousel');

  const previous = document.createElement('button');
  previous.className = 'product-rail-previous';
  previous.type = 'button';
  previous.setAttribute('aria-label', 'Previous slide');
  previous.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'product-rail-next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next slide');
  next.textContent = '›';

  const updateControls = () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    previous.disabled = list.scrollLeft <= 1;
    next.disabled = list.scrollLeft >= maxScroll - 1;
  };

  const scrollPage = (direction) => {
    const card = list.querySelector('li');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const cardsPerPage = window.matchMedia('(width <= 640px)').matches ? 1 : 3;
    list.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap) * cardsPerPage,
      behavior: 'smooth',
    });
  };

  previous.addEventListener('click', () => scrollPage(-1));
  next.addEventListener('click', () => scrollPage(1));
  list.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);

  block.append(previous, list, next);
  requestAnimationFrame(updateControls);
}

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const item = document.createElement('li');
    const media = addMobileDamRendition([...row.children].map(mediaFrom).find(Boolean));
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
  if (!list.children.length) return;
  block.replaceChildren();
  if (block.classList.contains('coupons')) decorateCouponCarousel(block, list);
  else block.append(list);
}
