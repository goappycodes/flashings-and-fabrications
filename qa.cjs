const { chromium } = require('C:/Users/rites/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 fs.mkdirSync('qa',{recursive:true});
 const errors=[];const results=[];
 const page=await browser.newPage({viewport:{width:1440,height:1050},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['light','dark']){
  const res=await page.goto('http://127.0.0.1:8087/'+route+'.html',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(im=>{im.loading='eager';return im.decode().catch(()=>{});} )));
  const images=await page.locator('img').evaluateAll(imgs=>imgs.filter(im=>!im.complete||!im.naturalWidth).map(im=>im.src));
  await page.screenshot({path:'qa/'+route+'-desktop.png',fullPage:true});
  await page.screenshot({path:'dist/assets/'+route+'-preview.jpg',type:'jpeg',quality:85});
  await page.getByRole('button',{name:/01 Metal flashings/}).click();
  await page.getByRole('dialog').waitFor({state:'visible'});
  await page.getByRole('button',{name:'Close details'}).click();
  await page.locator('input[name=name]').fill('Design Review');
  await page.locator('input[name=email]').fill('review@example.com');
  await page.locator('textarea[name=message]').fill('A test of the homepage enquiry preview.');
  await page.getByRole('button',{name:'Send enquiry'}).click();
  const form=await page.locator('.form-result').isVisible();
  results.push({route,status:res.status(),brokenImages:images,formDemoResult:form});
  for(const width of [390,320]){
   await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:8087/'+route+'.html',{waitUntil:'networkidle'});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   await page.getByRole('button',{name:'Open navigation'}).click();
   const menu=await page.locator('#mobile-nav').isVisible();
   await page.getByRole('button',{name:'Open navigation'}).click();
   await page.screenshot({path:'qa/'+route+'-'+width+'.png',fullPage:true});
   results.push({route,width,overflow,mobileMenu:menu});
  }
  await page.setViewportSize({width:1440,height:1050});
 }
 await page.goto('http://127.0.0.1:8087/',{waitUntil:'networkidle'});
 await page.screenshot({path:'qa/comparison.png',fullPage:true});
 const indexImages=await page.locator('img').evaluateAll(a=>a.filter(x=>!x.naturalWidth).map(x=>x.src));
 await page.setViewportSize({width:320,height:844});await page.reload({waitUntil:'networkidle'});
 results.push({route:'index',width:320,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),brokenImages:indexImages});
 console.log(JSON.stringify({results,errors},null,2));
 fs.writeFileSync('qa/results.json',JSON.stringify({results,errors},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
