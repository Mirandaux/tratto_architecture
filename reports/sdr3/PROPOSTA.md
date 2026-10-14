# SDR3: lo spazio prende forma

Proposta creativa per STUDIO SDR3 SRL STP, 14 ottobre 2026. L'utente ha autorizzato lo sviluppo di identità, testi e concept provvisori senza attendere materiali ufficiali.

## Identità e coreografia

SDR3 compare in quattro lettere con superfici di cemento, legno, metallo e vetro. Discesa dall'alto in sequenza, inclinazioni diverse, ombre che si allargano all'appoggio e un breve assestamento finale. Le etichette rivelano architettura, design d'interni, materia e luce, spazi da vivere: sono temi della proposta, non un'espansione ufficiale dell'acronimo SDR3.

Il sipario è stato abbreviato: prima visita 0,6 secondi di contatore e 0,55 di apertura; visite successive 0,25 secondi. La discesa delle lettere segue l'apertura e dura circa 2,2 secondi. Se l'utente comincia subito a scorrere, le lettere raggiungono lo stato finale senza trattenere il percorso. `will-change` viene rimosso al termine.

L'invito allo scroll continua nel percorso in casa, con lo stesso pin. Le due competenze hanno una sezione dedicata: una tavola volumetrica per architettura e una stanza per design d'interni. I tratti SVG si disegnano allo scroll. Menu, comparatore, metodo, galleria, manifesto, contatti e footer completano il sito.

Il logotipo è una proposta tipografica. I concept Casa Orizzonte, Interno Zenitale e Casa Salvia sono dichiarati come concept con immagini provvisorie; non sono lavori documentati dello studio.

## Dati e ricerca

Nome, indirizzo e telefono derivano dai dati forniti dall'utente:

- STUDIO SDR3 SRL STP.
- Via Cà Nova Zampieri, 3, 37057 San Giovanni Lupatoto (VR).
- +39 346 179 4594.

Google ha richiesto un controllo anti-bot; le ricerche pubbliche alternative non hanno identificato un profilo Instagram attribuibile con certezza allo studio. L'utente ha successivamente chiesto di interrompere la ricerca e proseguire con la proposta. Non sono stati inventati recapiti operativi, account social o partita IVA.

## Verifiche

Build di produzione riuscita. Chromium desktop 1440 px, mobile 360 px e movimento ridotto: 23 controlli funzionali e 12 scansioni axe senza violazioni. Verificati navigazione, capitoli, comparatore, galleria, modulo, breakpoint e assenza di overflow. La nuova sezione competenze è stata controllata separatamente con altre tre scansioni axe senza violazioni; verificati anche il link dall'apertura, la pulizia di `will-change` e la prima visita completa.

Con movimento ridotto le lettere sono già composte, il sipario è assente e le tavole sono statiche. Nessun pin o scrub.

Risultati della verifica generale in `browser-tests.json`. Anteprime in `desktop.jpg`, `mobile.jpg` e `movimento-ridotto.jpg`. La verifica specifica è ripetibile con `scripts/verifica-sdr3.mjs`, usando gli stessi strumenti temporanei documentati nel README.

Firefox, WebKit e Lighthouse non sono stati rieseguiti per questa proposta. L'invio effettivo del modulo su Vercel richiede un endpoint configurato. Le immagini continuano a riportare i crediti Unsplash.
