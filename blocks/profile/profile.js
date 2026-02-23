import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const parentDiv = document.createElement('div');
  [...block.children].forEach((row) => {
    const childDiv = document.createElement('div');
    childDiv.classList.add('profile-row');
    while (row.firstElementChild) childDiv.append(row.firstElementChild);
    [...childDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'profile-image';
      else {
        div.className = 'profile-content';
        const links = div.querySelectorAll('p');
        if (links.length > 1) {
          const socialDiv = document.createElement('div');
          socialDiv.classList.add('profile-social');
          socialDiv.append(...links);
          div.append(socialDiv);
        }
      }
    });
    parentDiv.append(childDiv);
  });
  parentDiv.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(parentDiv);
}
