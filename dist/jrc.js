const t=window.translations;
// The explicit URL always wins over a previously saved preference.
try{localStorage.setItem('language',location.pathname.startsWith('/en/')?'en':'es');}catch{}
document.querySelectorAll('.language-switch a').forEach(link=>{link.addEventListener('click',event=>{try{localStorage.setItem('language',link.lang);}catch{}if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||link.getAttribute('aria-current')==='page')return;event.preventDefault();link.parentElement.classList.add('is-switching');setTimeout(()=>{window.location.href=link.href+window.location.hash;},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:180);});});
const menuButton=document.querySelector('#menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',t['ui.openMenu']);}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?t['ui.closeMenu']:t['ui.openMenu']);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuButton.focus();}});
window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)nav.querySelectorAll('a[href^="#"]').forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-10% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
const moreButton=document.querySelector('#more-projects');
moreButton.addEventListener('click',()=>{const expanded=moreButton.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.extra-project').forEach(card=>card.hidden=!expanded);moreButton.setAttribute('aria-expanded',String(expanded));moreButton.querySelector('span').textContent=expanded?t['ui.less']:t['ui.more'];});
const dialog=document.querySelector('#project-dialog');
let opener;
const mobileView=document.querySelector('#view-mobile');
const desktopView=document.querySelector('#view-desktop');
const desktopImages={'Elodie Bentancor':'/assets/clean-desktop-elodie.png','Benja Barber':'/assets/clean-barberia-20261003.png','Personalizados Cathy':'/assets/clean-cathy-20261002.png','Estudio jurídico':'/assets/clean-estudio.png','Law firm':'/assets/clean-estudio.png'};
let activeProject;
function setProjectView(desktop){
 const image=document.querySelector('#dialog-image');
 image.src=desktop?desktopImages[activeProject.title]:activeProject.image;
 image.alt=(desktop?t['ui.desktopDesign']:t['ui.mobileDesign'])+activeProject.title;
 image.classList.toggle('desktop',desktop);
 mobileView.setAttribute('aria-pressed',String(!desktop));
 desktopView.setAttribute('aria-pressed',String(desktop));
}
mobileView.addEventListener('click',()=>setProjectView(false));
desktopView.addEventListener('click',()=>setProjectView(true));
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;activeProject=button.dataset;
 document.querySelector('#dialog-title').textContent=t['ui.preview']+button.dataset.title;
 desktopView.hidden=!desktopImages[button.dataset.title];setProjectView(false);
 const live=document.querySelector('#dialog-live');live.hidden=!button.dataset.url;
 if(button.dataset.url)live.href=button.dataset.url;else live.removeAttribute('href');
 dialog.showModal();dialog.scrollTop=0;document.querySelector('#close-dialog').focus();
 document.body.style.overflow='hidden';
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const controls=[...dialog.querySelectorAll('button,a[href]')].filter(el=>!el.hidden&&el.getClientRects().length&&!el.disabled);
 const first=controls[0],last=controls[controls.length-1];
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
const form=document.querySelector('#contact-form');
const status=document.querySelector('#form-status');
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form);
 const name=String(data.get('nombre')).trim();
 const email=String(data.get('email')).trim();
 const message=String(data.get('mensaje')).trim();
 const href='mailto:hola@jrcweb.tech?subject='+encodeURIComponent(t['ui.subject']+name)+'&body='+encodeURIComponent(t['ui.greeting']+'\n\n'+message+'\n\n'+name+'\n'+email);
 const fallback=document.querySelector('#email-draft');fallback.href=href;fallback.hidden=false;
 status.textContent=t['ui.ready'];
 document.dispatchEvent(new Event('jrc:email-draft-prepared'));
 window.location.href=href;
});
document.addEventListener('click',event=>{if(nav.classList.contains('open')&&!nav.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
nav.addEventListener('focusout',()=>{setTimeout(()=>{if(!nav.contains(document.activeElement)&&document.activeElement!==menuButton)closeMenu();},0);});
