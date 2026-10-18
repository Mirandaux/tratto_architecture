import { gsap, ScrollTrigger, reduced, picture, arrow, scrollTo } from '../shared';
export function entraInCasa(){
 const el=document.querySelector('#hero');
 const opening=el.querySelector('.opening-overlay').outerHTML;
 const titles=['Esterno','Soglia','Patio','Luce','Disegno'];
 const copy=[['Entra in casa.','Una soglia, un altro mondo.'],['La soglia.','Il soggiorno si apre e la casa diventa giardino.'],['Il patio.','Dentro, il rumore resta fuori.'],['La luce.','Alza lo sguardo. La luce entra dall’alto.'],['Il disegno.','Ogni stanza è cominciata da una linea.']];
 el.innerHTML=`<span id="entra" class="journey-anchor" aria-hidden="true"></span><div class="journey-stage">${opening}<h2 id="journey-title" class="visually-hidden">Entra in casa: un percorso dalla soglia alla luce</h2><div class="journey-photo journey-front">${picture('fronte','Villa con vetrate aperte sul soggiorno e piscina davanti al portale', {hero:true,sizes:'100vw'})}</div><div class="journey-flash" aria-hidden="true"></div><div class="journey-photo journey-patio">${picture('pozzo','Patio di cemento a tutta altezza, con acqua sul fondo e lucernario', {sizes:'100vw'})}</div><div class="journey-photo journey-drawing">${picture('pozzo-schizzo','Schizzo a matita del patio e del lucernario', {sizes:'100vw'})}<div class="journey-pencil" aria-hidden="true"></div></div><div class="journey-shade" aria-hidden="true"></div><div class="journey-top mono"><span>01 / Un percorso da abitare</span><div class="journey-progress"><i></i></div><span class="journey-percent">000%</span></div><div class="journey-captions">${copy.map(([title,text],i)=>`<div class="journey-caption ${i===0?'is-current':''}" ${i?'inert':''}><span class="mono">${i?`0${i} / ${titles[i]}`:'La casa, dall’interno'}</span><h3 class="display">${title}</h3><p>${text}</p>${i===0?'<span class="hand">scorri per entrare <span aria-hidden="true">↓</span></span>':''}${i===4?`<a class="pill journey-cta" href="#contatti">Disegniamo la tua ${arrow()}</a>`:''}</div>`).join('')}</div><nav class="journey-chapters" aria-label="Capitoli del percorso">${titles.map((title,i)=>`<button type="button" data-chapter="${i}" class="${i===0?'is-active':''}" ${i===0?'aria-current="step"':''}><span class="mono">0${i+1}</span><i></i><span>${title}</span></button>`).join('')}</nav><span class="journey-bottom mono">Tratto / Esperienza spaziale</span></div>`;
 const blurred=document.createElement('div');blurred.className='journey-front-blur';blurred.append(el.querySelector('.journey-front picture').cloneNode(true));el.querySelector('.journey-front').append(blurred);
 const overlay=el.querySelector('.opening-overlay');
 const stage=el.querySelector('.journey-stage'),captions=el.querySelectorAll('.journey-caption'),buttons=el.querySelectorAll('[data-chapter]');
 const stops=[0,.30,.46,.67,.91];let active=-1;
 function select(i){if(i===active)return;active=i;buttons.forEach((b,j)=>{b.classList.toggle('is-active',j===i);if(j===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});captions.forEach((c,j)=>{c.inert=i!==j;c.classList.toggle('is-current',i===j);});}
 if(reduced){
  const staticOpening=document.createElement('div');staticOpening.className='static-opening';staticOpening.innerHTML=el.querySelector('.journey-front').outerHTML+'<div class="journey-shade" aria-hidden="true"></div>';staticOpening.append(overlay);el.prepend(staticOpening);
  el.querySelector('.scroll-invite').addEventListener('click',()=>scrollTo(stage));
  el.classList.add('static-journey');gsap.set(stage.querySelectorAll('.journey-front,.journey-flash,.journey-drawing'),{opacity:0});gsap.set('.journey-patio',{opacity:1});gsap.set('.journey-caption',{opacity:0});gsap.set(captions[3],{opacity:1});select(3);
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{select(i);gsap.set(captions,{opacity:0});gsap.set(captions[i],{opacity:1});gsap.set(stage.querySelector('.journey-front'),{opacity:i<2?1:0});gsap.set('.journey-patio',{opacity:i>=2&&i<4?1:0});gsap.set('.journey-drawing',{opacity:i===4?1:0,clipPath:'inset(0)'});}));return;
 }
 el.querySelector('.journey-chapters').inert=true;gsap.set('.journey-top,.journey-chapters,.journey-bottom',{opacity:0});gsap.set('.journey-patio',{opacity:0,scale:1.3});gsap.set('.journey-patio img',{y:()=>stage.clientHeight-el.querySelector('.journey-patio img').clientHeight});gsap.set('.journey-drawing',{clipPath:'inset(0 100% 0 0)'});gsap.set(captions,{opacity:0,y:24});
 const timeline=gsap.timeline({scrollTrigger:{trigger:el,start:'top top',end:()=>`+=${innerHeight*(innerWidth<=760?3:4.5)}`,pin:stage,scrub:1,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{el.querySelector('.journey-percent').textContent=String(Math.round(self.progress*100)).padStart(3,'0')+'%';let i=0;stops.forEach((p,j)=>{if(self.progress>=p-.02)i=j;});select(i);overlay.inert=self.progress>.085;el.querySelector('.journey-chapters').inert=self.progress<.12;document.querySelector('#header').classList.toggle('past-opening',self.progress>.14);el.querySelector('.percent').textContent=String(Math.round(self.progress*100)).padStart(3,'0')+'%';}}});
 timeline.to('.mask-left',{xPercent:-105,duration:.055,ease:'none'},0).to('.mask-right',{xPercent:105,duration:.055,ease:'none'},0)
 .to('.threshold-copy,.figure-label,.threshold-foot,.crosshair',{opacity:0,y:-35,duration:.065},.02)
 .to('.circle-progress',{strokeDashoffset:0,duration:.09,ease:'none'},0)
 .to('.journey-top,.journey-chapters,.journey-bottom',{opacity:1,duration:.04},.12)
 .to('.journey-front',{scale:5.4,transformOrigin:'38.5% 58%',duration:.36,ease:'power2.in'},0)
 .to(blurred,{opacity:1,duration:.08},.28)
 .to('.journey-flash',{opacity:1,duration:.08},.27).to('.journey-flash',{opacity:0,duration:.09},.35)
 .to('.journey-front',{opacity:0,duration:.06},.34).to('.journey-patio',{opacity:1,scale:1,duration:.46,ease:'none'},.34).fromTo('.journey-patio img',{y:()=>stage.clientHeight-el.querySelector('.journey-patio img').clientHeight},{y:0,duration:.46,ease:'none'},.34)
 .to('.journey-drawing',{clipPath:'inset(0 0% 0 0)',duration:.15,ease:'none'},.80).fromTo('.journey-pencil',{x:0},{x:()=>stage.clientWidth,duration:.15,ease:'none'},.80).to('.journey-pencil',{opacity:0,duration:.03},.95)
 .to('.journey-progress i',{scaleX:1,duration:1,ease:'none'},0);
 const ranges=[[.13,.24],[.30,.44],[.46,.63],[.67,.78],[.86,1]];
 ranges.forEach(([start,end],i)=>{timeline.to(captions[i],{opacity:1,y:0,duration:.035},start);if(i<4)timeline.to(captions[i],{opacity:0,y:-20,duration:.035},end-.035);});
 el.querySelector('.scroll-invite').addEventListener('click',()=>{const st=timeline.scrollTrigger;scrollTo(st.start+(st.end-st.start)*.32,{offset:0,duration:1.8});});
 buttons.forEach((b,i)=>b.addEventListener('click',()=>{const st=timeline.scrollTrigger;scrollTo(st.start+(st.end-st.start)*Math.min(stops[i]+.035,.99),{offset:0,duration:1.25});}));
}
