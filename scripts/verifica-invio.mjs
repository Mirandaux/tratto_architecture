import {createRequire} from 'node:module';import {resolve} from 'node:path';
const require=createRequire(resolve(process.env.TRATTO_TEST_TOOLS||resolve(import.meta.dirname,'../.test-tools'),'package.json'));
const {chromium}=require('@playwright/test');import assert from 'node:assert/strict';
const options=process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']}:{};const b=await chromium.launch(options);const p=await b.newPage({reducedMotion:'reduce'});let status=500,submitted;
await p.route('http://localhost:5175/',async route=>{
 if(route.request().method()!=='POST')return route.continue();submitted=new URLSearchParams(route.request().postData());return route.fulfill({status,contentType:'text/plain',body:status===200?'Ricevuto':'Errore'});
});
await p.goto('http://localhost:5175');await p.locator('#contatti').scrollIntoViewIfNeeded();
await p.locator('#nome').fill('Mario Rossi');await p.locator('#email').fill('mario@example.com');await p.locator('#progetto').selectOption('Nuova casa');await p.locator('#idea').fill('Una casa luminosa da progettare insieme.');
await p.locator('.contact-form button').click();await p.waitForFunction(()=>document.querySelector('.form-status').textContent.includes('Non è stato possibile'));
assert.equal(await p.locator('#nome').inputValue(),'Mario Rossi');assert.equal(submitted.get('form-name'),'primo-schizzo');assert.equal(submitted.get('progetto'),'Nuova casa');
status=200;await p.locator('.contact-form button').click();await p.waitForFunction(()=>document.querySelector('.form-status').textContent.includes('è arrivato'));assert.equal(await p.locator('#nome').inputValue(),'');
console.log('Netlify: payload URL-encoded, risposta 500 con dati preservati e risposta 200 con conferma e reset verificati tramite endpoint simulato.');await b.close();
