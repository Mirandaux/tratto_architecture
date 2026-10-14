import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
const require=createRequire(resolve(process.env.TRATTO_TEST_TOOLS||resolve(root,'.test-tools'),'package.json'));
const {chromium}=require('@playwright/test');
const base=(process.env.TEST_URL||'http://localhost:5174').replace(/\/$/,'');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try{
for(const route of ['/','/proposta/']){
 const context=await browser.newContext();const p=await context.newPage();await p.route('**/*.js',r=>r.abort());await p.goto(base+route);assert(await p.locator('.material-letter').evaluateAll(xs=>xs.every(x=>getComputedStyle(x).opacity==='0'&&getComputedStyle(x).visibility==='hidden')));await context.close();console.log(route,'lettere nascoste prima di JavaScript: OK');
}
for(const visitad of [false,true]){
 const context=await browser.newContext();const p=await context.newPage();if(visitad)await p.addInitScript(()=>sessionStorage.setItem('tratto-visita','1'));
 await p.addInitScript(()=>{window.preIntroFrames=[];window.fallFrames=[];function sample(){const letters=[...document.querySelectorAll('.material-letter')];if(document.querySelector('#intro')&&letters.length)window.preIntroFrames.push(letters.every(x=>getComputedStyle(x).opacity==='0'));if(!document.querySelector('#intro')&&letters.length)window.fallFrames.push(letters.some(x=>{const s=getComputedStyle(x);return Number(s.opacity)>0&&Number(s.opacity)<1&&s.transform!=='none';}));requestAnimationFrame(sample);}requestAnimationFrame(sample);});
 await p.goto(base+'/');assert(await p.evaluate(()=>preIntroFrames.length>0&&preIntroFrames.every(Boolean)));
 await p.waitForTimeout(3400);assert(await p.evaluate(()=>fallFrames.some(Boolean)));assert(await p.locator('.material-letter').evaluateAll(xs=>xs.every(x=>getComputedStyle(x).opacity==='1'&&getComputedStyle(x).visibility==='visible')));console.log('visita',visitad?'ripetuta':'iniziale','nascoste, poi caduta e comparsa: OK');await context.close();
}
const context=await browser.newContext({reducedMotion:'reduce'});const p=await context.newPage();await p.goto(base+'/');assert(await p.locator('.material-letter').evaluateAll(xs=>xs.every(x=>getComputedStyle(x).opacity==='1'&&getComputedStyle(x).visibility==='visible')));console.log('Movimento ridotto: lettere statiche visibili OK');}finally{await browser.close();}
