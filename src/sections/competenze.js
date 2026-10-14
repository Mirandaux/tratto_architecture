import {gsap, reduced, label, arrow} from '../shared';

const volume=`<path class="expertise-line" d="M75 260 260 180l270 87-190 93-265-100v-145l185-84 270 86v150M75 115l265 91 190-89M340 206v154M260 31v149M168 147v149m90-116 82 26M388 225v86l85-43v-82M48 282l290 103 229-110M58 98l197-91 287 93"/><path class="expertise-line fine" d="M40 330 330 434l250-112M40 322v16m540-24v16M36 112v148m-7-148h14m-14 148h14M75 300v35m265 65v40m190-133v32"/>`;
const interior=`<path class="expertise-line" d="M85 340V110l215-66 215 66v230L300 426 85 340M300 44v223M85 110l215 78 215-78M300 188v238M133 291v-88l85 26v90m-85-116 85 26M355 182l108-38v121l-108 40V182M404 164v123M344 337l100-37 40 13v36l-100 41-40-15v-38l40 15 100-39M384 352v38M120 356l112 37 84-35-110-33-86 31M232 393v15M300 125v43m-27-43h54l-12-19h-30l-12 19"/><path class="expertise-line fine" d="M59 360l245 97 240-98M60 352v16m483-17v16M54 104v233m-8-233h16m-16 233h16"/>`;

export function competenze(){
 const el=document.querySelector('#competenze');
 el.innerHTML=`${label('02','Architettura + Design d’interni')}<div class="section-heading"><h2 id="expertise-title">Dallo spazio.<br>Al dettaglio<span class="accent-text">.</span></h2><span class="hand">Due sguardi.<br>Un unico progetto.</span></div><div class="expertise-grid"><article class="expertise-card architecture"><div class="expertise-meta mono"><span>01 / Architettura</span><span>Lo spazio</span></div><div class="expertise-drawing"><svg viewBox="0 0 600 480" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${volume}</svg><span class="hand">La forma incontra il luogo.</span></div><h3>Architettura.</h3><p>Volumi, proporzioni e luce. Il progetto mette in relazione gli spazi e il modo di viverli, dal primo disegno alla loro forma costruita.</p><a class="text-link" href="#contatti">Parliamo del tuo spazio ${arrow()}</a></article><article class="expertise-card interiors"><div class="expertise-meta mono"><span>02 / Design d’interni</span><span>Il dettaglio</span></div><div class="expertise-drawing"><svg viewBox="0 0 600 480" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${interior}</svg><span class="hand">Il carattere abita i dettagli.</span></div><h3>Design d’interni.</h3><p>Materiali, colori, arredi e illuminazione. Ogni scelta contribuisce a dare carattere agli ambienti e a costruire un equilibrio che ti somiglia.</p><a class="text-link" href="#contatti">Immaginiamo i tuoi interni ${arrow()}</a></article></div>`;
 if(reduced)return;
 el.querySelectorAll('.expertise-card').forEach(card=>{
  gsap.from(card.querySelectorAll('h3,p,.text-link'),{y:30,opacity:0,duration:.8,stagger:.1,scrollTrigger:{trigger:card,start:'top 70%',once:true}});
  card.querySelectorAll('.expertise-line').forEach(path=>{
   const length=path.getTotalLength();gsap.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:card,start:'top 85%',end:'center 45%',scrub:1}});
  });
  gsap.fromTo(card.querySelector('svg'),{y:35,rotation:-3},{y:-12,rotation:0,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:1}});
 });
}
