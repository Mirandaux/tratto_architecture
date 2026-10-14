import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
const require=createRequire(resolve(process.env.TRATTO_TEST_TOOLS||resolve(root,'.test-tools'),'package.json'));
const {chromium}=require('@playwright/test');
const {default:AxeBuilder}=require('@axe-core/playwright');
const output=resolve(process.env.TEST_OUTPUT||resolve(root,'.test-results/sdr3'));await mkdir(output,{recursive:true});
const url=process.env.TEST_URL||'http://localhost:5174/';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
for(const [width,reducedMotion] of [[1440,'no-preference'],[360,'no-preference'],[1440,'reduce']]){
 const context=await b.newContext({viewport:{width,height:950},reducedMotion});const p=await context.newPage();await p.addInitScript(()=>sessionStorage.setItem('tratto-visita','1'));await p.goto(url);await p.waitForTimeout(2900);
 assert.equal(await p.locator('.material-letter').count(),4);assert(await p.locator('.material-letter').evaluateAll(xs=>xs.every(x=>!x.style.willChange)));
 await p.locator('.sdr3-skills-link').click();await p.waitForTimeout(1900);assert(await p.locator('#expertise-title').isVisible());
 if(!reducedMotion||reducedMotion==='no-preference')await p.evaluate(()=>window.trattoLenis.scrollTo(document.querySelector('#competenze'),{immediate:true,offset:0}));
 await p.waitForTimeout(1000);const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),[]);
 await p.screenshot({path:resolve(output,`competenze-${width}-${reducedMotion}.jpg`)});
 assert.equal(await p.locator('a[href="tel:+393461794594"]').count(),1);console.log(width,reducedMotion,'lettere, will-change, link competenze e axe OK');await context.close();
}
// La prima visita deve terminare sia il sipario sia la caduta delle lettere.
const context=await b.newContext();const p=await context.newPage();await p.goto(url);await p.waitForTimeout(5900);assert.equal(await p.locator('#intro').count(),0);assert(await p.locator('.material-letter').evaluateAll(xs=>xs.every(x=>getComputedStyle(x).opacity==='1'&&!x.style.willChange)));console.log('Prima visita: sipario e lettere terminano correttamente');await b.close();
