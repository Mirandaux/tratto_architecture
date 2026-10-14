import { gsap, ScrollTrigger, reduced } from '../shared';

export function hero(){
 const letters=[...document.querySelectorAll('.material-letter')];
 const captions=[...document.querySelectorAll('.material-caption')];
 const shadows=[...document.querySelectorAll('.letter-shadow')];
 if(reduced) return ()=>{};
 // Le trasformazioni d'ingresso restano separate dal movimento del percorso.
 let entrance;
 const clear=()=>letters.forEach(letter=>letter.style.removeProperty('will-change'));
 ScrollTrigger.create({trigger:'#hero',start:'top top',end:'+=30',onLeave:()=>{entrance?.progress(1);clear();}});
 return ()=>{
  if(scrollY>30)return;
  letters.forEach(letter=>letter.style.willChange='transform, opacity');
  entrance=gsap.timeline({onComplete:clear});
  letters.forEach((letter,i)=>{
   const at=i*.19;
   entrance.fromTo(letter,{y:()=>-innerHeight*.95,rotationX:34,rotationZ:[-13,9,-8,12][i],opacity:0},{y:0,rotationX:0,rotationZ:0,opacity:1,duration:1.15,ease:'power3.in'},at)
   .to(letter,{y:-10,rotationZ:[1,-1,.8,-.6][i],duration:.16,ease:'power2.out'},at+1.15)
   .to(letter,{y:0,rotationZ:0,duration:.22,ease:'power2.in'},at+1.31)
   .fromTo(shadows[i],{scaleX:.35,opacity:0},{scaleX:1,opacity:.55,duration:.6,ease:'power2.in'},at+.65)
   .fromTo(captions[i],{y:16,opacity:0},{y:0,opacity:1,duration:.45,ease:'power2.out'},at+1.18);
  });
  entrance.fromTo('.sdr3-intention,.sdr3-skills-link',{y:18,opacity:0},{y:0,opacity:1,duration:.65,stagger:.12},1.6);
 };
}
