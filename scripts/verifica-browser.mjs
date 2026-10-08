import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
const tools=resolve(process.env.TRATTO_TEST_TOOLS||resolve(root,'.test-tools'));
const require=createRequire(resolve(tools,'package.json'));
const {chromium,firefox,webkit}=require('@playwright/test');
const {default:AxeBuilder}=require('@axe-core/playwright');
const type={chromium,firefox,webkit}[process.env.TEST_BROWSER||'chromium'];
assert(type,'Browser non valido');
const out=resolve(process.env.TEST_OUTPUT||resolve(root,'.test-results'));
await mkdir(out,{recursive:true});
const options={env:{...process.env,XDG_CONFIG_HOME:'/tmp/tratto-browser-config',XDG_CACHE_HOME:'/tmp/tratto-browser-cache',MOZ_DISABLE_CONTENT_SANDBOX:'1',MOZ_DISABLE_RDD_SANDBOX:'1'}};
if(type===chromium&&process.env.CHROMIUM_PATH){options.executablePath=process.env.CHROMIUM_PATH;options.args=['--no-sandbox'];}
const browser=await type.launch(options);
const findings=[];
try{
 for(const [name,width,motionReduced] of [['desktop',1440,false],['mobile',360,false],['reduced',1440,true]]){
  console.error(`${type.name()}: ${name}`);
  const context=await browser.newContext({viewport:{width,height:950},reducedMotion:motionReduced?'reduce':'no-preference'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>sessionStorage.setItem('tratto-visita','1'));
  await page.goto(process.env.TEST_URL||'http://localhost:5174');await page.waitForTimeout(1600);
  const navigate=async selector=>{await page.evaluate(s=>window.trattoLenis?window.trattoLenis.scrollTo(document.querySelector(s),{immediate:true}):document.querySelector(s).scrollIntoView(),selector);await page.waitForTimeout(1000);};
  const screenshot=async section=>page.screenshot({path:resolve(out,`${type.name()}-${name}-${section}.png`)});
  const checks=[];const a11y=[];
  async function accessibility(section){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();a11y.push({section,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))}))});}
  assert.equal((await page.locator('h1').textContent()).trim(),'Ogni casa comincia da una linea.');
  await screenshot('hero');await accessibility('hero');checks.push('Hero e accessibilità iniziale');
  await page.keyboard.press('Tab');assert(await page.locator('.skip-link').evaluate(el=>el===document.activeElement));await page.keyboard.press('Enter');assert(await page.locator('h1').evaluate(el=>el===document.activeElement));checks.push('Salto al contenuto da tastiera');
  if(name==='mobile'){
   await page.locator('.menu-toggle').click();await page.waitForTimeout(400);
   assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');checks.push('Menu mobile e tasto Escape');
  }
  await navigate('#entra');await page.locator('[data-chapter="3"]').click();await page.waitForTimeout(1600);
  assert.equal(await page.locator('[data-chapter="3"]').getAttribute('aria-current'),'step');await screenshot('journey');checks.push('Navigazione ai capitoli del percorso');
  await navigate('#volume');await page.locator('[data-value="0"]').click();assert.equal(await page.locator('#comparison').inputValue(),'0');
  await page.locator('[data-value="100"]').click();assert.equal(await page.locator('#comparison').inputValue(),'100');
  await page.locator('[data-value="50"]').click();await page.locator('#comparison').focus();await page.keyboard.press('ArrowLeft');assert.notEqual(await page.locator('#comparison').inputValue(),'50');
  const box=await page.locator('.compare-frame').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width*.25,box.y+box.height/2,{steps:6});await page.mouse.up();
  assert(Math.abs(Number(await page.locator('#comparison').inputValue())-75)<10,'Il trascinamento deve aggiornare il range');
  await screenshot('compare');await accessibility('comparatore');checks.push('Tre preset, frecce e trascinamento del comparatore');
  await navigate('#progetti');await page.locator('.gallery-next').click();await page.waitForTimeout(1600);assert.equal(await page.locator('.gallery-count').innerText(),'01 / 03');
  await page.locator('.gallery-next').click();await page.waitForTimeout(1600);assert.equal(await page.locator('.gallery-count').innerText(),'02 / 03');
  await screenshot('projects');await accessibility('progetti');checks.push('Navigazione e contatore della galleria');
  await navigate('#contatti');await page.locator('.contact-form button').click();assert.equal(await page.locator('[aria-invalid="true"]').count(),4);
  await page.locator('#nome').fill('Mario Rossi');await page.locator('#email').fill('mario@example.com');await page.locator('#progetto').selectOption('Nuova casa');await page.locator('#idea').fill('Una casa immersa nella luce, vicino al giardino.');
  await page.locator('.contact-form button').click();const status=await page.locator('.form-status').innerText();assert(status.includes('Nessun messaggio'),'L’invio locale non deve simulare una conferma');
  await screenshot('contact');await accessibility('contatti');checks.push('Validazione del modulo e invio locale non configurato');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const pins=await page.locator('.pin-spacer').count();assert.equal(pins,motionReduced?0:width<=760?1:2);
  assert.deepEqual(errors,[]);checks.push('Nessun errore JavaScript, nessun overflow, pin coerenti');
  if(name==='desktop'){
   await page.setViewportSize({width:360,height:950});await page.waitForTimeout(1300);assert.equal(await page.locator('.pin-spacer').count(),1);assert(await page.locator('#progetti').evaluate(e=>e.classList.contains('swipe-gallery')));
   await page.setViewportSize({width:1440,height:950});await page.waitForTimeout(1300);assert.equal(await page.locator('.pin-spacer').count(),2);checks.push('Cambio di breakpoint senza ricaricare la pagina');
  }
  findings.push({browser:type.name(),scenario:name,checks,pins,errors,accessibility:a11y});
  await context.close();
 }
 await writeFile(resolve(out,`${type.name()}.json`),JSON.stringify(findings,null,2));
 console.log(JSON.stringify(findings,null,2));
 assert(findings.every(f=>f.accessibility.every(a=>a.violations.length===0)),'Violazioni di accessibilità da risolvere');
}finally{await browser.close();}
