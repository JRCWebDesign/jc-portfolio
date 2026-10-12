const toggle = document.querySelector('#menu-toggle');
const sidebar = document.querySelector('#sidebar');
const backdrop = document.querySelector('#menu-backdrop');
function setMenu(open) {
 sidebar.classList.toggle('open', open);
 toggle.setAttribute('aria-expanded', String(open));
 toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
 backdrop.hidden = !open;
 document.body.classList.toggle('menu-open', open);
 sidebar.inert = matchMedia('(max-width:760px)').matches && !open;
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
backdrop.addEventListener('click', () => setMenu(false));
window.addEventListener('resize', () => setMenu(false));
setMenu(false);
document.addEventListener('keydown', event => { if(event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {setMenu(false); toggle.focus();} });
sidebar.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
const links = [...sidebar.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => {
 for(const entry of entries) if(entry.isIntersecting) links.forEach(link => {
  if(link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
  else link.removeAttribute('aria-current');
 });
}, {rootMargin:'-10% 0px -55% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
const show = document.querySelector('#show-projects');
show.addEventListener('click', () => {
 const expanded = show.getAttribute('aria-expanded') !== 'true';
 document.querySelectorAll('.project-card').forEach((card,i) => {if(i>1) card.hidden = !expanded;});
 show.setAttribute('aria-expanded',String(expanded));
 show.innerHTML = `${expanded ? 'Ver menos proyectos' : 'Ver todos los proyectos'} <i class="bi bi-arrow-${expanded ? 'up' : 'right'}" aria-hidden="true"></i>`;
});
const dialog = document.querySelector('#image-dialog');
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
 document.querySelector('#dialog-title').textContent = button.dataset.title;
 const image = document.querySelector('#dialog-image');
 image.src = button.dataset.image;
 image.alt = `Vista completa del diseño de ${button.dataset.title}`;
 dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click',event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
