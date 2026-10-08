import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const assets = import.meta.glob('/assets/immagini/*-[0-9]*.{avif,webp,jpg}', { eager: true, query: '?url', import: 'default' });
export const asset = (name, size=1400, type='avif') => assets[`/assets/immagini/${name}-${size}.${type}`];
export function picture(name, alt, { hero=false, className='', sizes='(max-width: 760px) 100vw, 65vw' }={}) {
  const widths = ['villa','fronte','villa-schizzo','fronte-schizzo'].includes(name) ? [800,1400,1800] : [800,1400];
  const ratio = name.startsWith('pozzo') ? 3213/5712 : name.startsWith('salvia') ? 4160/6240 : name.startsWith('sbalzo') ? 5599/4125 : name.startsWith('villa') ? 7781/5190 : 5969/3979;
  const set = type => widths.map(s=>`${asset(name,s,type)} ${Math.round(s*Math.min(1,ratio))}w`).join(', ');
  return `<picture class="${className}"><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${asset(name,1400,'jpg')}" srcset="${set('jpg')}" sizes="${sizes}" width="${Math.round(1400*Math.min(1,ratio))}" height="${Math.round(1400/Math.max(1,ratio))}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async" ${hero?'fetchpriority="high"':''}></picture>`;
}
export const arrow = (direction='up') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="arrow-icon ${direction}"><path d="M5 19 19 5M5 5h14v14"/></svg>`;
export const label = (num, text) => `<div class="section-label"><span class="label-dot"></span><span>${num} / ${text}</span></div>`;
export function reveal(elements, trigger, options={}) {
  if(reduced) return;
  gsap.from(elements, { y:42, opacity:0, duration:.9, stagger:.12, ease:'power3.out', scrollTrigger:{trigger,start:'top 85%',once:true}, ...options });
}
export function scrollTo(target, options={}) {
  if(window.trattoLenis) window.trattoLenis.scrollTo(target, {offset:-80,...options});
  else if(typeof target==='number') window.scrollTo({top:target,behavior:reduced?'instant':'smooth'});
  else document.querySelector(target)?.scrollIntoView({behavior:reduced?'instant':'smooth'});
}
