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
const track = document.querySelector('#design-track');
const slides = [...track.querySelectorAll('.mobile-project')];
const previous = document.querySelector('#gallery-prev');
const next = document.querySelector('#gallery-next');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function currentSlide() {
  const left = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
  return slides.reduce((best, slide, i) => Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? i : best, 0);
}
function moveGallery(direction) {
  const index = Math.max(0, Math.min(slides.length - 1, currentSlide() + direction));
  const offset = slides[index].getBoundingClientRect().left - track.getBoundingClientRect().left - parseFloat(getComputedStyle(track).paddingLeft);
  track.scrollTo({left: track.scrollLeft + offset, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
function updateGallery() {
  document.querySelector('#gallery-count').textContent = `${String(currentSlide() + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  previous.disabled = track.scrollLeft < 2;
  next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
}
previous.addEventListener('click', () => moveGallery(-1));
next.addEventListener('click', () => moveGallery(1));
track.addEventListener('keydown', event => {
  if (event.target === track && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault(); moveGallery(event.key === 'ArrowRight' ? 1 : -1);
  }
});
track.addEventListener('scroll', updateGallery, {passive:true});
window.addEventListener('resize', updateGallery);
updateGallery();
const dialogImage = document.querySelector('#dialog-image');
document.querySelectorAll('.capture').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = button.dataset.title;
  dialogImage.src = button.dataset.image;
  dialogImage.alt = `Captura ampliada de ${button.dataset.title}`;
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close(); } });
