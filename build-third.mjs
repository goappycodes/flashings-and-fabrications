import {readFileSync,writeFileSync} from 'node:fs';
import {directionC,services} from './direction-c.mjs';
export function buildThird(out,form){
 let page=readFileSync(new URL('dark.html',out),'utf8');
 page=page.replace('class="trade"','class="foundry"').replace('<title>Trade bold','<title>Built for the detail');
 page=page.replace(/<div class="utility">[\s\S]*?<\/div><\/div>/,'');
 const serviceNav=`<div class="foundry-services-bar"><nav class="wrap" aria-label="Services navigation">${services.map(([label,,key])=>`<button data-detail="${key}">${label}<span aria-hidden="true">↗</span></button>`).join('')}</nav></div>`;
 page=page.replace('</header>','</header>'+serviceNav);
 page=page.replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${directionC({form})}</main>`);
 page=page.replace('<link href="styles.css"','<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap" rel="stylesheet"><link href="styles.css"');
 page=page.replace('<link href="type-system.css" rel="stylesheet">','<link href="type-system.css" rel="stylesheet"><link href="direction-c.css" rel="stylesheet">');
 page=page.replace('Our workshop</a>','Our workshop</a>');
 writeFileSync(new URL('bold.html',out),page);
 let index=readFileSync(new URL('index.html',out),'utf8');
 const card=`<a class="direction" href="bold.html"><div class="direction-preview"><img src="assets/bold-preview.jpg" alt="Preview of the Built for the detail homepage"><span>03 · Built for the detail</span></div><div class="direction-info"><div><h2>Montserrat. Made bold.</h2></div><span class="direction-arrow">↗</span></div><p>An asymmetric metal-photo opening, Montserrat 900 headings, an editorial service list and a different capability and project sequence. A new composition within the same industrial palette.</p><span class="button primary">Explore Built for the detail ↗</span></a>`;
 index=index.replace('</a></div><section class="review-principles">',`</a>${card}</div><section class="review-principles">`);
 index=index.replaceAll('Two homepage','Three homepage').replaceAll('Two different ways','Three different ways');
 index=index.replace('Both keep the same clear product navigation, local proof and straightforward enquiry journey.','Built for the detail explores Montserrat 900 and a new asymmetric layout. All three retain local proof and straightforward enquiry routes.');
 writeFileSync(new URL('index.html',out),index);
}
