# Un nuovo ingresso per Tratto

Ricerca e prototipo: 8 ottobre 2026.

## Direzione consigliata: La soglia

La prima schermata diventa l'inizio della visita alla casa. La facciata riempie il viewport; il marchio e due controlli restano sovrapposti all'immagine. Il primo scroll apre i margini di carta e avvicina lo sguardo al soggiorno. L'invito è concreto: «Scorri e attraversa la soglia».

L'header attuale è chiaro, ma la barra di navigazione e le due colonne fanno percepire subito una pagina da consultare. Inoltre, il ciclo automatico di 18 secondi racconta la trasformazione senza richiedere interazione. Il nuovo ingresso lega il proseguimento del racconto a un gesto dell'utente. È un'ipotesi progettuale, non un aumento di engagement già misurato.

## Riferimenti consultati

Le osservazioni sotto provengono dai contenuti e dalla struttura delle pagine pubbliche e dalla scheda Awwwards. Non costituiscono una verifica completa delle animazioni dei siti.

| Riferimento | Elemento osservato | Implicazione per Tratto |
| --- | --- | --- |
| [Awwwards, Architecture](https://www.awwwards.com/websites/architecture/) | La selezione combina identità visiva, fotografia, interazione e navigazione; comprende anche candidature. | La spettacolarità deve rendere leggibile il percorso e lasciare accessibili progetti e contatti. |
| [SANTAL, scheda Awwwards](https://www.awwwards.com/sites/santal) | Candidatura dell'8 ottobre 2026, con elementi dedicati a loading, filosofia, animazione e infinite scroll; tag Storytelling, Scrolling, Interaction Design e GSAP. | Progettare un ingresso come una sequenza narrativa. SANTAL è un nominee, non un vincitore verificato. Non serve adottarne WebGL o 3D per ottenere una progressione scenografica. |
| [Snøhetta](https://www.snohetta.com/) | Presentazione sintetica della pratica, accesso a People, Process e Projects; impostazioni Simplified e Low-res. | Sintesi nell'apertura e un'esperienza semplice quando il movimento è ridotto. |
| [Olson Kundig](https://olsonkundig.com/) | La presentazione si sviluppa attraverso frasi su persone, luoghi ed esperienza; navigazione Projects, Practice, People e Play; controllo del movimento. | Dare alla fotografia una voce narrativa, usando poche parole e un gesto comprensibile. |
| [MVRDV](https://www.mvrdv.com/) | «Design for a changing world» e temi come casa, città e sogni verdi collegano visione e progetti. | Aprire con una promessa riconoscibile, poi dimostrarla attraverso gli spazi. |

## La proposta concreta

1. **Fotografia a tutto schermo.** La facciata di `fronte.jpg` anticipa la stessa casa del percorso immersivo. I sottili margini millimetrati conservano l'identità di Tratto.
2. **Navigazione sovrapposta.** Marchio a sinistra, «Parliamone» ed «Esplora» a destra. L'indice si apre come un taccuino con cinque capitoli numerati; i collegamenti restano raggiungibili da tastiera.
3. **Una promessa breve.** «Prima una linea.» e, a mano, «Poi la tua casa.» Il testo occupa una zona protetta per restare leggibile sulla fotografia.
4. **Scroll con conseguenza immediata.** I bordi di carta si aprono, il titolo lascia spazio e la fotografia avanza verso l'ingresso. Il pulsante di invito permette di compiere lo stesso passaggio con un clic o con la tastiera.
5. **Continuità con il patio.** La schermata seguente conferma il gesto: «Hai fatto il primo passo. Ora, alza lo sguardo.»

In produzione questa apertura va integrata nel primo capitolo di «Entra in casa», riutilizzando il relativo ScrollTrigger. Il pin aggiuntivo del prototipo serve solo a valutarne la coreografia e non deve sommarsi alle 4,5 schermate già presenti. La trasformazione schizzo, volume, materia e luce può restare nel comparatore e nel resto del racconto. L'intro iniziale deve lasciare arrivare rapidamente a questa schermata.

## Alternative considerate

- **Il foglio si apre:** una tavola di progetto si divide e rivela la fotografia. Molto coerente con la matita, ma introduce un ulteriore velo prima di vedere la casa.
- **La matita guida:** il segno accompagna lo scroll e costruisce la facciata. Più astratto; rischia di ripetere il comparatore e le animazioni già presenti.

«La soglia» sfrutta meglio le foto disponibili e rende evidente che cosa succederà continuando a scorrere.

## Prototipo e verifiche

- [Prototipo HTML](./proposta.html), servito da Vite all'indirizzo `/reports/ricerca-ingresso/proposta.html`.
- [Anteprima desktop](./desktop.jpg), [mobile 360 px](./mobile.jpg), [movimento ridotto](./ridotto.jpg).
- Verificato in Chromium: desktop 1440 px, mobile 360 px e movimento ridotto; nessun errore JavaScript né overflow orizzontale. Apertura e chiusura menu, Escape e pulsante di avanzamento funzionano. Il pin è assente con movimento ridotto.
- Il prototipo non sostituisce l'header della pagina principale. È incluso nella build di Vite come pagina separata al percorso `/proposta/`, pubblicabile anche su Vercel. La pagina è esclusa dall'indicizzazione. Le prove Firefox, WebKit, Lighthouse e un audit completo di accessibilità saranno da ripetere dopo l'integrazione nel sito.

## Ambiente di ricerca

Sono stati aggiunti alla bozza dell'ambiente i domini di Awwwards, Snøhetta, Olson Kundig e MVRDV, mantenendo i domini già configurati. L'accesso HTTP alle pagine di riferimento è stato verificato. Il salvataggio della bozza non equivale alla pubblicazione della configurazione: per renderla persistente nei futuri ambienti, rivedere e salvare le impostazioni dell'ambiente, quindi pubblicare l'ambiente.
