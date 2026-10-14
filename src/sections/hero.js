import { gsap, ScrollTrigger, reduced } from '../shared';

export function hero(){
 const letters=[...document.querySelectorAll('.material-letter')];
 if(reduced) return ()=>{};
 // Le trasformazioni d'ingresso restano separate dal movimento del percorso.
 let entrance;
 const clear=()=>letters.forEach(letter=>letter.style.removeProperty('will-change'));
 const finish=()=>{gsap.set(letters,{autoAlpha:1,y:0,rotationX:0,rotationZ:0});clear();};
 gsap.set(letters,{autoAlpha:0});
 ScrollTrigger.create({trigger:'#hero',start:'top top',end:'+=30',onLeave:()=>{if(entrance)entrance.progress(1);else finish();clear();}});
 return ()=>{
  if(scrollY>30){finish();return;}
  letters.forEach(letter=>letter.style.willChange='transform, opacity');
  entrance=gsap.timeline({onComplete:clear});
  letters.forEach((letter,i)=>{
   const at=i*.19;
   entrance.fromTo(letter,{y:()=>-innerHeight*.95,rotationX:0,rotationZ:[-5,4,-3,5][i],autoAlpha:0},{y:0,rotationX:0,rotationZ:0,autoAlpha:1,duration:1.15,ease:'power3.in'},at)
   .to(letter,{y:-4,rotationZ:[1,-1,.8,-.6][i],duration:.16,ease:'power2.out'},at+1.15)
   .to(letter,{y:0,rotationZ:0,duration:.22,ease:'power2.in'},at+1.31);

  });
  entrance.fromTo('.sdr3-intention,.sdr3-skills-link',{y:18,opacity:0},{y:0,opacity:1,duration:.65,stagger:.12},1.6);
 };
}
