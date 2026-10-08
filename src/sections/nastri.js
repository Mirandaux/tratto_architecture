import { gsap, ScrollTrigger, reduced } from '../shared';
export function nastri(){
 const el=document.querySelector('#nastri');
 const words=['luce','materia','soglia','vuoto','ombra','misura','paesaggio','silenzio'];
 const first=words.map((w,i)=>`<span class="${i%2?'hand':''}">${w}</span><i aria-hidden="true">+</i>`).join('');
 const second=['schizzo 01','volume 02','materia 03','luce 04'].map(w=>`<span>${w}</span><i aria-hidden="true">/</i>`).join('');
 el.innerHTML=`<div class="ribbon-row first"><div class="ribbon-track"><div>${first}</div><div aria-hidden="true">${first}</div></div></div><div class="ribbon-row second"><div class="ribbon-track"><div>${second}</div><div aria-hidden="true">${second}</div></div></div>`;
 if(reduced)return;
 const tracks=el.querySelectorAll('.ribbon-track');const a=gsap.to(tracks[0],{xPercent:-50,duration:36,ease:'none',repeat:-1}),b=gsap.fromTo(tracks[1],{xPercent:-50},{xPercent:0,duration:42,ease:'none',repeat:-1});
 ScrollTrigger.create({trigger:el,start:'top bottom',end:'bottom top',onUpdate:self=>{const velocity=self.getVelocity();const speed=1+Math.min(Math.abs(velocity)/1000,4);gsap.to([a,b],{timeScale:speed,duration:.25,overwrite:true});gsap.to(tracks,{skewX:gsap.utils.clamp(-6,6,velocity/500),duration:.3,overwrite:true});gsap.to([a,b],{timeScale:1,duration:.8,delay:.2,overwrite:'auto'});gsap.to(tracks,{skewX:0,duration:.8,delay:.2,overwrite:'auto'});}});
 new IntersectionObserver(([e])=>{a.paused(!e.isIntersecting);b.paused(!e.isIntersecting);}).observe(el);
}
