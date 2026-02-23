function toSlug(str = '') {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[\s_/]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'accordion-items';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const question = cells[0].textContent.trim();
    const answerHTML = cells[1].innerHTML.trim();
    if (!question) return;

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.id = `accordion-${toSlug(question)}`;

    const summary = document.createElement('summary');
    summary.className = 'accordion-question';
    summary.textContent = question;

    const answer = document.createElement('div');
    answer.className = 'accordion-answer';
    answer.innerHTML = answerHTML;

    details.append(summary, answer);
    container.appendChild(details);
  });

  block.appendChild(container);
}
