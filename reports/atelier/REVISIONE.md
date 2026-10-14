# SDR3: scena da atelier

Revisione del 14 ottobre 2026 in seguito al feedback dell'utente: «L'estetica: voglio una scena più essenziale, con lettere davvero materiche».

La prima schermata ora è una scena neutra. Il marchio è composto da quattro sculture tipografiche rappresentate in un nuovo render originale: pietra chiara, noce, metallo grafite e vetro ambrato. Le superfici sono continue, con spessore visibile, luce uniforme e ombre di contatto. Non contengono più ritagli di fotografie architettoniche.

Il render è un asset trasparente generato per questa proposta e ottimizzato in WebP: circa 222 kB per desktop e 65 kB per mobile. Le quattro porzioni vengono animate separatamente tramite GSAP; il volume è rappresentato nell'immagine, senza introdurre un motore 3D. Gli originali generati sono conservati fuori dal checkout; i due asset necessari alla build sono in `assets/materiali/`.

Rimosse le etichette sotto le lettere, la villa di sfondo nell'apertura, i riquadri decorativi e le annotazioni. Le competenze sono espresse da «Architettura. Design d'interni.». Il primo scroll dissolve la scena e conduce nella casa usando il pin esistente. Tutte le sezioni del sito restano presenti, anche al percorso `/proposta/`.

Il menu è più discreto nella scena iniziale e torna leggibile sulle fotografie e sulle sezioni successive. È stato corretto il contrasto del logotipo con movimento ridotto nelle sezioni scure. In questa modalità la scena resta statica e il percorso non usa pin.

Verifiche sulla build di produzione: script generale per desktop 1440 px, mobile 360 px e movimento ridotto; verifica specifica per lettere, link competenze e prima visita. Risultati in `browser-tests.json`. Firefox, WebKit e Lighthouse non sono stati rieseguiti per questa revisione.

## Correzione della comparsa iniziale

Le lettere sono nascoste dal primo rendering con uno stile critico nel head di entrambe le pagine. GSAP usa autoAlpha per rivelarle durante la caduta. Rimosso il marchio grande dal sipario per non anticiparne la comparsa. Se lo scroll viene ripristinato o l'utente salta l'ingresso, lo stato finale viene comunque reso visibile. Movimento ridotto e assenza di JavaScript mantengono la composizione statica.

Verifica specifica con `scripts/verifica-comparsa.mjs`: asset nascosti prima dell'esecuzione di JavaScript, campionamento dei fotogrammi durante il sipario e la caduta su prima visita e visita ripetuta, e composizione statica con movimento ridotto.
