const projects = [
  ['DEMO-AlmaBeauty', 'Demo web', 'JessicaCasella'],
  ['GymTimer', 'Proyecto · JavaScript', 'JessicaCasella'],
  ['MiAgenda', 'Proyecto · HTML', 'JessicaCasella'],
  ['RedirectReviewNFCSeek', 'Proyecto · HTML', 'JRCWebDesign'],
  ['Calculadora', 'Proyecto · JavaScript', 'JessicaCasella'],
  ['ObligatorioP22023', 'Proyecto · C#', 'JessicaCasella'],
  ['ProyectoDIW', 'Proyecto · CSS', 'JessicaCasella'],
  ['Ta-Te-Ti', 'Proyecto · JavaScript', 'JessicaCasella']
];
const list = document.querySelector('#archive-list');
for (const [name, description, account] of projects) {
  const link = document.createElement('a');
  link.href = `https://github.com/${account}/${name}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = name;
  const detail = document.createElement('small');
  detail.textContent = `${description} · Ver en GitHub`;
  link.append(detail);
  list.append(link);
}

const codeOutput = document.querySelector('#profile-code');
const initialCode = codeOutput.innerHTML;
const codeViews = { profile: initialCode, stack: '<span class="syntax-comment">// Las herramientas detrás de mis proyectos.</span>\n{\n  <span class="syntax-pink">"frontend"</span>: [\n    "JavaScript",\n    "React"\n  ],\n  <span class="syntax-pink">"backend"</span>: [".NET", "C#"],\n  <span class="syntax-pink">"datos"</span>: ["SQL Server", "MySQL"],\n  <span class="syntax-pink">"herramientas"</span>: [\n    "Git", "Azure DevOps"\n  ]\n}' };
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab) {
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  codeOutput.innerHTML = codeViews[tab.dataset.view];
  document.querySelector('#code-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('.editor-bottom > span').textContent = tab.dataset.view === 'stack' ? 'JSON' : 'JavaScript';
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); activateTab(next); next.focus(); }
  });
});
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
document.querySelectorAll('.capture').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = button.dataset.title;
  dialogImage.src = button.dataset.image;
  dialogImage.alt = `Captura ampliada de ${button.dataset.title}`;
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close(); } });
