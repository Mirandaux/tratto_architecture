import { gsap, reduced, label, reveal } from '../shared';
const illustrations=[
`<path class="icon-draw" d="M49 67v-9C32 49 34 22 54 20c23-3 31 24 15 38v9M48 73h22m-19 6h16m-12 6h8M60 5v8M26 19l8 8m52-8-8 8M16 44h13m62 0h13M50 44l10 9 10-9m-10 9v14"/>`,
`<path class="icon-draw" d="M17 84h87M29 84V45l31-25 31 25v39M22 48l38-28 38 28M47 84V62h24v22M33 51h9v13h-9m44-13h9v13h-9M12 14l92 78M14 95 104 9M21 16h80"/>`,
`<path class="icon-draw" d="M23 20h76v67H23V20m39 0v32m0 18v17M23 52h39m18 0h19M42 87V68h20M62 52a18 18 0 0 0 18 18m0-18v18M42 68a19 19 0 0 0-19 19M12 20v67m-4-67h8m-8 67h8M23 10h76m-76-4v8m76-8v8"/>`,
`<g class="block block-1"><path d="m24 70 31-10 37 10-31 10-37-10v13l37 10 31-10V70M61 80v13"/></g><g class="block block-2"><path d="m24 49 31-10 37 10-31 10-37-10v13l37 10 31-10V49M61 59v13"/></g><g class="block block-3"><path d="m24 28 31-10 37 10-31 10-37-10v13l37 10 31-10V28M61 38v13"/></g>`
];
export function metodo(){
 const el=document.querySelector('#metodo');
 const items=[['Ascolto','Ogni progetto parte da una conversazione. Ci racconti come vivi, cosa ami, cosa ti manca.','Prima, le persone.'],['Schizzo','La matita cerca possibilità. Pochi segni, molte domande. Lo spazio prende la sua prima forma.','Il pensiero diventa segno.'],['Progetto','Diamo misura all’intuizione. Luce, materiali e dettagli trovano un equilibrio preciso.','Ogni millimetro conta.'],['Cantiere','Seguiamo il progetto mentre diventa materia. Fino al momento in cui apri la porta.','La linea diventa casa.']];
 el.innerHTML=`${label('03','Il nostro metodo')}<div class="section-heading"><h2 id="method-title">Quattro gesti,<br>una casa<span class="accent-text">.</span></h2><p class="method-intro">Non una formula.<br>Un percorso da fare insieme.</p></div><div class="method-grid">${items.map(([title,text,note],i)=>`<article class="method-card"><div class="method-card-top mono"><span>0${i+1}</span><span>${['Capire','Immaginare','Misurare','Costruire'][i]}</span></div><svg class="method-icon" viewBox="0 0 120 110" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${illustrations[i]}</svg><h3>${title}</h3><p>${text}</p><span class="hand">${note}</span></article>`).join('')}</div>`;
 reveal(el.querySelectorAll('.method-card'),el,{opacity:1});
 if(reduced)return;
 const loops=[];
 el.querySelectorAll('.icon-draw').forEach((path,i)=>{const length=path.getTotalLength();loops.push(gsap.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:3,repeat:-1,repeatDelay:2.5,ease:'power1.inOut',delay:i*.4}));});
 const t=gsap.timeline({repeat:-1,repeatDelay:1.6});t.from('.block-1',{y:-26,opacity:0,duration:.9,ease:'bounce.out'}).from('.block-2',{y:-36,opacity:0,duration:.9,ease:'bounce.out'},.55).from('.block-3',{y:-45,opacity:0,duration:.9,ease:'bounce.out'},1.1);loops.push(t);
 new IntersectionObserver(([e])=>loops.forEach(t=>t.paused(!e.isIntersecting))).observe(el);
}
