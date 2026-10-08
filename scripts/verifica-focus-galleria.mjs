import {createRequire} from 'node:module';import {resolve} from 'node:path';
const require=createRequire(resolve(process.env.TRATTO_TEST_TOOLS||resolve(import.meta.dirname,'../.test-tools'),'package.json'));
const {chromium,firefox,webkit}=require('@playwright/test');import assert from 'node:assert/strict';
for(const type of [chromium,firefox,webkit]){
 const opts={env:{...process.env,XDG_CONFIG_HOME:'/tmp/tratto-browser-config',XDG_CACHE_HOME:'/tmp/tratto-browser-cache',MOZ_DISABLE_CONTENT_SANDBOX:'1',MOZ_DISABLE_RDD_SANDBOX:'1'}};if(type===chromium&&process.env.CHROMIUM_PATH){opts.executablePath=process.env.CHROMIUM_PATH;opts.args=['--no-sandbox'];}
 const b=await type.launch(opts);const p=await b.newPage({viewport:{width:1440,height:950}});await p.addInitScript(()=>sessionStorage.setItem('tratto-visita','1'));await p.goto('http://localhost:5174');await p.waitForTimeout(1200);await p.evaluate(()=>window.trattoLenis.scrollTo(document.querySelector('#progetti'),{immediate:true}));await p.waitForTimeout(1100);await p.locator('.projects-viewport').focus();await p.keyboard.press('Tab');await p.waitForTimeout(700);
 assert.equal(await p.locator('.projects-viewport').evaluate(e=>e.scrollLeft),0);assert.equal(await p.locator('.gallery-count').innerText(),'03 / 03');const r=await p.locator('.project-outro a').boundingBox();assert(r.x>=0&&r.x+r.width<=1440&&r.y>=0&&r.y+r.height<=950);console.log(type.name()+': CTA finale raggiungibile da tastiera e scroll sincronizzato.');await b.close();
}
