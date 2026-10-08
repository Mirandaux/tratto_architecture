import { gsap, reduced } from '../shared';
export function hero(){
 if(reduced) return ()=>{};
 return ()=>{gsap.fromTo('.threshold-copy',{opacity:0},{opacity:1,duration:.7,ease:'power2.out'});};
}
