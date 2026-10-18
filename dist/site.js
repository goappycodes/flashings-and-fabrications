const menu = document.querySelector('.menu-toggle');
const mobile = document.querySelector('#mobile-nav');
menu.addEventListener('click', () => { const opened=menu.getAttribute('aria-expanded')==='true'; menu.setAttribute('aria-expanded', String(!opened)); mobile.hidden=opened; });
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');}));
const dialog = document.querySelector('.detail-dialog');
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 if(mobile.contains(button)){mobile.hidden=true;menu.setAttribute('aria-expanded','false');}
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

// Preserve each direction's opening image, then crossfade through two others.
const heroImage=document.querySelector('.light-hero-visual>img, .trade-hero-image, .foundry-hero-photo>img');
if(heroImage){
 const stage=heroImage.parentElement;
 const allImages=[
  {src:'assets/workshop-concept.png',alt:'Illustrative sheet-metal workshop with a press brake'},
  {src:'assets/folded-metal-concept.png',alt:'Illustrative folded metal flashing profiles'},
  {src:'assets/amex-820x293_c.jpg',alt:'Amex Stadium in Brighton, a published FFS project'}
 ];
 const opening=allImages.find(x=>heroImage.getAttribute('src')===x.src);
 const sequence=[opening,...allImages.filter(x=>x!==opening)].filter(Boolean);
 const slides=[heroImage];
 stage.classList.add('hero-slideshow');
 stage.setAttribute('role','region');
 stage.setAttribute('aria-label','Hero image slideshow');
 heroImage.classList.add('hero-slide','is-active');
 heroImage.setAttribute('aria-hidden','false');
 sequence.slice(1).forEach(item=>{
  const img=heroImage.cloneNode(false);
  img.src=item.src;img.alt=item.alt;
  img.classList.remove('is-active');
  img.setAttribute('aria-hidden','true');
  img.decoding='async';img.loading='eager';img.removeAttribute('fetchpriority');
  stage.insertBefore(img,heroImage.nextSibling);
  slides.push(img);
 });
 const control=document.createElement('button');
 control.type='button';control.className='hero-slideshow-control';
 stage.append(control);
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,userPaused=false,timer=null,ready=false;
 const updateControl=()=>{
  control.textContent=userPaused?'▶':'Ⅱ';
  control.setAttribute('aria-label',userPaused?'Play hero image slideshow':'Pause hero image slideshow');
  control.setAttribute('aria-pressed',String(userPaused));
  control.hidden=motion.matches;
 };
 const show=index=>{
  slides.forEach((img,i)=>{img.classList.toggle('is-active',i===index);img.setAttribute('aria-hidden',String(i!==index));});
  active=index;stage.dataset.activeSlide=String(index);
 };
 const stop=()=>{clearInterval(timer);timer=null;};
 const sync=()=>{
  stop();updateControl();
  if(ready&&!userPaused&&!motion.matches&&!document.hidden){
   timer=setInterval(()=>show((active+1)%slides.length),5500);
  }
 };
 control.addEventListener('click',()=>{userPaused=!userPaused;sync();});
 document.addEventListener('visibilitychange',sync);
 motion.addEventListener('change',()=>{if(motion.matches)show(0);sync();});
 show(0);updateControl();
 Promise.all(slides.map(img=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false))).then(loaded=>{
  // If an image is unavailable, retain a useful static opening image.
  ready=loaded.every(Boolean);stage.dataset.slideshowReady=String(ready);
  if(!ready)control.hidden=true;else sync();
 });
}
