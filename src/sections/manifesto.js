import { gsap, reduced, label, reveal } from '../shared';
export function manifesto(){
 const el=document.querySelector('#manifesto');
 const first='Uno spazio non finisce nei suoi muri. Prende forma';const last='nelle persone che lo abitano.';
 const words=t=>t.split(' ').map(w=>`<span class="manifesto-word">${w}</span>`).join(' ');
 const ideas=[['Matita prima del mouse','Una linea fatta a mano lascia spazio all’intuizione. E alle tue domande.'],['Il render è una promessa','L’immagine anticipa uno spazio. Il nostro lavoro è renderlo vero, dettaglio dopo dettaglio.'],['Il vuoto è una stanza','Lasciamo posto alla luce, al silenzio, alla vita che deve ancora arrivare.']];
 el.innerHTML=`${label('06','Quello in cui crediamo')}<h2 id="manifesto-title" class="manifesto-statement">${words(first)} <span class="manifesto-final hand">${words(last)}</span></h2><div class="manifesto-ideas">${ideas.map(([title,text],i)=>`<article><span class="mono">0${i+1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div><span class="manifesto-signature hand">SDR3. Lo spazio, insieme.</span>`;
 if(!reduced){gsap.to(el.querySelectorAll('.manifesto-word'),{color:i=>i>=first.split(' ').length?'#E9B872':'#F1ECE2',stagger:.15,ease:'none',scrollTrigger:{trigger:el.querySelector('h2'),start:'top 78%',end:'bottom 35%',scrub:1}});reveal(el.querySelectorAll('.manifesto-ideas article'),el.querySelector('.manifesto-ideas'));}
}
