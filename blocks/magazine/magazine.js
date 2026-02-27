import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const parentDiv = document.createElement('div');
  [...block.children].forEach((row) => {
    const innerDiv = document.createElement('div');
    innerDiv.className = 'magazine-row';
    while (row.firstElementChild) innerDiv.append(row.firstElementChild);
    [...innerDiv.children].forEach((div) => {
      if (div.children.length > 1 && div.querySelector('picture')) div.className = 'magazine-content';
      else div.className = 'magazine-links';
    });
    parentDiv.append(innerDiv);
  });
  parentDiv.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(parentDiv);
}
