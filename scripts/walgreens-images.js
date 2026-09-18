const MOBILE_RENDITION = '/_jcr_content/renditions/cq5dam.thumbnail.766.320.png';

export default function addMobileDamRendition(media) {
  const img = media?.matches('img') ? media : media?.querySelector('img');
  if (!img) return media;

  const src = img.getAttribute('src');
  if (!src?.includes('www.walgreens.com/content/dam/connectedassets/walgreens/us/en/homepage/image-renditions/')
    || src.includes('/_jcr_content/renditions/')) return media;

  let picture = media.matches('picture') ? media : null;
  if (!picture) {
    picture = document.createElement('picture');
    img.replaceWith(picture);
    picture.append(img);
  }
  if (picture.querySelector('source[data-wag-mobile-rendition]')) return picture;

  const source = document.createElement('source');
  source.dataset.wagMobileRendition = '';
  source.media = '(max-width: 640px)';
  source.srcset = `${src}${MOBILE_RENDITION}`;
  picture.prepend(source);
  return picture;
}
