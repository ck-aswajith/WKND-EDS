import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  let articles = [];
  try {
    const resp = await fetch(block.textContent);
    if (resp.ok) {
      const json = await resp.json();
      articles = json.data || json.articles || [];
    }
  } catch (e) {
    block.textContent = 'Failed to load articles.';
    return;
  }

  // Create a list to display articles
  if (articles.length > 0) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('article-listing-row');
    articles.forEach((article) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('article-listing-item');
      const title = article.title || 'Untitled Article';
      const url = article.path || '#';
      const desc = article.description || 'lorem ipsum dolor sit amet.';
      const p = document.createElement('picture');
      const img = document.createElement('img');
      img.src = article.image || '';
      img.alt = title;
      p.appendChild(img);
      itemDiv.appendChild(p);
      const h3 = document.createElement('h3');
      h3.textContent = title;
      itemDiv.appendChild(h3);
      const d = document.createElement('p');
      d.textContent = desc;
      itemDiv.appendChild(d);
      itemDiv.addEventListener('click', () => {
        window.location.href = url;
      });
      parentDiv.appendChild(itemDiv);
    });
    parentDiv.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    block.replaceChildren(parentDiv);
  } else {
    block.textContent = 'No articles found.';
  }
}
