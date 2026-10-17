const menu = document.querySelector('.menu-toggle');
const mobile = document.querySelector('#mobile-nav');
menu.addEventListener('click', () => { const opened=menu.getAttribute('aria-expanded')==='true'; menu.setAttribute('aria-expanded', String(!opened)); mobile.hidden=opened; });
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');}));
const dialog = document.querySelector('.detail-dialog');
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 const d=window.FFS_DETAILS[button.dataset.detail];
 const content=document.querySelector('.dialog-content');
 content.replaceChildren();
 if(d.image){const im=document.createElement('img');im.src='assets/'+d.image;im.alt=d.title;content.append(im);}
 const title=document.createElement('h2');title.textContent=d.title;title.id='detail-title';content.append(title);dialog.setAttribute('aria-labelledby','detail-title');
 const p=document.createElement('p');p.textContent=d.text;content.append(p);
 const ul=document.createElement('ul');d.items.forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.append(li);});content.append(ul);
 const a=document.createElement('a');a.href='#enquiry';a.className='button primary';a.textContent='Talk to us about your project ↗';a.addEventListener('click',()=>dialog.close());content.append(a);
 if(d.source){const source=document.createElement('a');source.href=d.source;source.target='_blank';source.rel='noopener';source.className='source-link';source.textContent='View existing project source ↗';content.append(source);}
 dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('.enquiry-form').addEventListener('submit',e=>{
 e.preventDefault();
 const result=e.currentTarget.querySelector('.form-result');
 result.textContent='Preview complete — your details have not been sent. On the finished website, this enquiry will go to the FFS team. To contact FFS now, call 01903 726500.';
 result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
});
