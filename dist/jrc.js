const menuButton=document.querySelector('#menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuButton.focus();}});
window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)nav.querySelectorAll('a').forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-10% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
const moreButton=document.querySelector('#more-projects');
moreButton.addEventListener('click',()=>{const expanded=moreButton.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.extra-project').forEach(card=>card.hidden=!expanded);moreButton.setAttribute('aria-expanded',String(expanded));moreButton.querySelector('span').textContent=expanded?'Ver menos proyectos':'Ver más proyectos';});
const dialog=document.querySelector('#project-dialog');
let opener;
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{opener=button;document.querySelector('#dialog-title').textContent=button.dataset.title;const image=document.querySelector('#dialog-image');image.src=button.dataset.image;image.alt='Diseño móvil de '+button.dataset.title;const live=document.querySelector('#dialog-live');live.hidden=!button.dataset.url;if(button.dataset.url)live.href=button.dataset.url;else live.removeAttribute('href');dialog.showModal();}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>opener?.focus());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const name=String(data.get('nombre')).trim();const email=String(data.get('email')).trim();const message=String(data.get('mensaje')).trim();const href='mailto:hola@jrcweb.tech?subject='+encodeURIComponent('Consulta web de '+name)+'&body='+encodeURIComponent('Hola Jessica,\n\n'+message+'\n\n'+name+'\n'+email);const fallback=document.querySelector('#email-draft');fallback.href=href;fallback.hidden=false;document.querySelector('#form-status').textContent='El mensaje está preparado. Se abrirá tu aplicación de correo para enviarlo.';window.location.href=href;});
