import {gsap,ScrollTrigger,reduced} from '../../src/shared';
import Lenis from 'lenis';
let lenis;
if(!reduced){lenis=new Lenis({duration:.95});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);}
const stage=document.querySelector('.threshold-stage');
const trigger= !reduced ? gsap.timeline({scrollTrigger:{trigger:'.threshold',pin:stage,start:'top top',end:()=>'+='+innerHeight*.95,scrub:.7,invalidateOnRefresh:true,onUpdate:s=>document.querySelector('.percent').textContent=String(Math.round(s.progress*100)).padStart(3,'0')+'%'}})
.to('.mask-left',{xPercent:-105,duration:.25,ease:'none'},0).to('.mask-right',{xPercent:105,duration:.25,ease:'none'},0)
.to('.crosshair',{opacity:0,duration:.15},0).to('.threshold-photo',{scale:1.55,transformOrigin:'38.5% 58%',duration:1,ease:'power1.inOut'},0)
.to('.photo-shade',{opacity:.5,duration:.35},0).to('.threshold-copy',{y:-70,opacity:0,duration:.35},.13)
.to('.figure-label,.foot-note,.threshold-coordinate',{opacity:0,duration:.2},.1).to('.scroll-invite',{y:25,opacity:0,duration:.25},.38)
.to('.circle-progress',{strokeDashoffset:0,duration:.5,ease:'none'},0).to('.threshold-photo',{opacity:0,duration:.2},.8) : null;
document.querySelector('.scroll-invite').addEventListener('click',()=>{if(trigger){lenis.scrollTo(trigger.scrollTrigger.end+30,{offset:0,duration:1.8});}else document.querySelector('#oltre').scrollIntoView();});
const button=document.querySelector('.index-toggle'),menu=document.querySelector('.index-menu');let open=false;
function toggle(){open=!open;stage.classList.toggle('menu-open',open);button.setAttribute('aria-expanded',open);button.firstChild.textContent=open?'Chiudi ':'Esplora ';menu.inert=!open;lenis?.[open?'stop':'start']();if(open&&!reduced)gsap.fromTo(menu.querySelectorAll('a'),{opacity:0,y:25},{opacity:1,y:0,duration:.6,stagger:.06});}
button.addEventListener('click',toggle);document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){toggle();button.focus();}if(e.key==='Tab'){const items=[button,...menu.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus();}}});
window.addEventListener('load',()=>ScrollTrigger.refresh());document.fonts.ready.then(()=>ScrollTrigger.refresh());
