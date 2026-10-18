import { gsap, reduced } from '../shared';
export function intro() {
  const el=document.querySelector('#intro');
  if(reduced) {el.remove();return Promise.resolve();}
  let visited=false;try{visited=sessionStorage.getItem('tratto-visita')==='1';sessionStorage.setItem('tratto-visita','1');}catch{}
  el.innerHTML=`<div class="intro-top mono"><span>Tratto Architetti</span><span>Uno spazio, prima un segno.</span></div><svg class="intro-house" viewBox="0 0 220 180" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 160h180M40 160V73l70-50 70 50v87M25 85l85-62 85 62M94 160v-51h32v51M58 90h20v25H58M142 90h20v25h-20M20 174V60M11 60h18M11 160h18"/></svg><div class="intro-bottom"><span class="hand">dalla linea alla casa</span><div class="intro-number display">000</div><div class="intro-bar"><i></i></div><span class="mono">Una linea alla volta</span></div>`;
  window.trattoLenis?.stop();
 return new Promise(resolve=>{
    const t=gsap.timeline({onComplete:()=>{el.remove();window.trattoLenis?.start();resolve();}});
    if(!visited){
      const path=el.querySelector('path');const len=path.getTotalLength();gsap.set(path,{strokeDasharray:len,strokeDashoffset:len});
      const count={value:0};t.to(path,{strokeDashoffset:0,duration:2.1,ease:'power1.inOut'},0).to(count,{value:100,duration:2.1,ease:'none',onUpdate:()=>{el.querySelector('.intro-number').textContent=String(Math.round(count.value)).padStart(3,'0');}},0).fromTo('.intro-bar i',{scaleX:0},{scaleX:1,duration:2.1,ease:'none'},0);
    }
    t.to(el,{clipPath:'inset(0 0 100% 0)',duration:visited ? 0.4 : 1.1,ease:'power4.inOut'});
  });
}
