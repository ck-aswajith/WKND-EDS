import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const parentDiv = document.createElement('div');
  [...block.children].forEach((row) => {
    const childDiv = document.createElement('div');
    childDiv.classList.add('featured-article-row');
    while (row.firstElementChild) childDiv.append(row.firstElementChild);
    [...childDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'featured-article-image';
      else div.className = 'featured-article-content';
    });
    parentDiv.append(childDiv);
  });
  parentDiv.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(parentDiv);
}
