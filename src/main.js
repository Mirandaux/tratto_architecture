import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reduced } from './shared';
import { intro } from './sections/intro';
import { header } from './sections/header';
import { hero } from './sections/hero';
import { entraInCasa } from './sections/entra-in-casa';
import { nastri } from './sections/nastri';
import { comparatore } from './sections/comparatore';
import { metodo } from './sections/metodo';
import { progetti } from './sections/progetti';
import { manifesto } from './sections/manifesto';
import { contatti } from './sections/contatti';
import { footer } from './sections/footer';
if(!reduced){
 const lenis=new Lenis({duration:1.1,smoothWheel:true});window.trattoLenis=lenis;
 lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(time=>lenis.raf(time*1000));gsap.ticker.lagSmoothing(0);
}
header();const animateHero=hero();entraInCasa();nastri();comparatore();metodo();progetti();manifesto();contatti();footer();intro().then(animateHero);
if(!reduced&&matchMedia('(pointer:fine)').matches){
 gsap.set('.custom-cursor',{xPercent:-50,yPercent:-50});
 const cursor=document.querySelector('.custom-cursor'),text=cursor.querySelector('span');let x=0,y=0,cx=0,cy=0,hasMoved=false;
 document.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!hasMoved){cx=x;cy=y;hasMoved=true;}cursor.style.opacity='1';const target=e.target.closest('[data-cursor]');cursor.classList.toggle('active',!!target);text.textContent=target?.dataset.cursor||'';});
 document.addEventListener('pointerleave',()=>cursor.style.opacity='0');
 const setX=gsap.quickSetter(cursor,'x','px'),setY=gsap.quickSetter(cursor,'y','px');gsap.ticker.add(()=>{if(!hasMoved)return;cx+=(x-cx)*.22;cy+=(y-cy)*.22;setX(cx);setY(cy);});
}
window.addEventListener('load',()=>ScrollTrigger.refresh());document.fonts.ready.then(()=>ScrollTrigger.refresh());
