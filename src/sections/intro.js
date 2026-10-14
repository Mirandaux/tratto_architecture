import {gsap, reduced} from '../shared';
export function intro(){
 const el=document.querySelector('#intro');
 if(reduced){el.remove();return Promise.resolve();}
 let visited=false;try{visited=sessionStorage.getItem('tratto-visita')==='1';sessionStorage.setItem('tratto-visita','1');}catch{}
 el.innerHTML=`<div class="intro-top mono"><span>Studio SDR3</span><span>Architettura / Design d’interni</span></div><div class="intro-brand" aria-hidden="true">SDR3<span>.</span></div><div class="intro-bottom"><span class="hand">lo spazio prende forma</span><div class="intro-number display">000</div><div class="intro-bar"><i></i></div><span class="mono">San Giovanni Lupatoto / Verona</span></div>`;
 window.trattoLenis?.stop();
 return new Promise(resolve=>{
  const t=gsap.timeline({onComplete:()=>{el.remove();window.trattoLenis?.start();resolve();}});
  if(!visited){
   const count={value:0};t.to(count,{value:100,duration:.6,ease:'none',onUpdate:()=>el.querySelector('.intro-number').textContent=String(Math.round(count.value)).padStart(3,'0')},0)
   .fromTo('.intro-bar i',{scaleX:0},{scaleX:1,duration:.6,ease:'none'},0);
  }
  t.to(el,{clipPath:'inset(0 0 100% 0)',duration:visited?.25:.55,ease:'power4.inOut'});
 });
}
