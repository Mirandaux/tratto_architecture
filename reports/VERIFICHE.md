# Verifiche di Tratto Architetti

Verificate l'8 ottobre 2026 sulla build statica servita in locale. Nessun deploy esterno eseguito.

## Lighthouse

| Controllo | Mobile | Desktop |
| --- | ---: | ---: |
| Prestazioni | 96 | 92 |
| Accessibilità | 100 | 100 |
| Buone pratiche | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2,44 s | 0,84 s |
| FCP | 1,5 s | 0,6 s |
| TBT | 120 ms | 150 ms |
| CLS | 0,002 | 0,002 |

Report completi: [mobile](lighthouse-mobile.html), [desktop](lighthouse-desktop.html). Dati sintetici in `lighthouse-summary.json`. Il test mobile usa il profilo Lighthouse con rete e CPU simulate; il target LCP inferiore a 2,5 secondi è raggiunto in questa misura, non costituisce una garanzia su ogni rete 4G. La sequenza del sipario mantiene la durata richiesta, circa 3,2 secondi alla prima visita.

## Browser e interazioni

Chromium di sistema, Firefox 157 e WebKit 27.2: passati 9 scenari complessivi, desktop 1440 px, mobile 360 px e movimento ridotto. Risultati in `browser-tests.json`.

69 controlli funzionali complessivi e 36 scansioni axe WCAG A/AA senza violazioni negli stati verificati. Controllati: titolo e caricamento dell'hero, salto al contenuto, menu mobile ed Escape, capitoli del percorso, preset/range/frecce/trascinamento del comparatore, galleria e contatore, campi obbligatori e stato del modulo, overflow orizzontale, pin e cambio di breakpoint senza ricaricare. Desktop: due pin; mobile: uno; movimento ridotto: nessuno.

Verificati anche il sipario alla prima visita e nelle visite successive, la centratura del cursore e la navigazione da tastiera alla CTA finale della galleria. L'assenza di errori nei controlli automatici non sostituisce una verifica completa con tecnologie assistive.

Safari reale non è disponibile sulla macchina Linux. WebKit è il motore di Safari, ma questa prova non certifica macOS/iOS. Resta una prova su dispositivi Apple reali, inclusa l'altezza dinamica della viewport.

## Immagini e invio

72 derivati responsive: corrispondenza delle dimensioni foto/schizzo verificata in ogni formato e taglia. Generati 100 segmenti deduplicati, Open Graph 1200×630 e civico sfocato nei derivati salvia. Gli originali restano intatti.

Build normale e build Netlify completate. Il modulo locale valida i quattro campi e non simula un invio. Una build con `NETLIFY=true` è stata provata con risposte simulate: payload URL-encoded corretto; errore 500 conserva i dati; risposta 200 conferma e ripulisce il modulo. Nessun messaggio reale è stato inviato a Netlify o a un servizio esterno.

## Prima della pubblicazione definitiva

- Sostituire i segnaposto dei recapiti, della città e della P.IVA, compreso il JSON-LD.
- Configurare Netlify Forms o `VITE_CONTACT_ENDPOINT` e verificare un invio reale sul dominio pubblicato.
- Impostare URL assolute Open Graph, canonical e `og:url` quando il dominio è noto.
- Verificare Safari su macOS/iOS e adeguare l'informativa sul trattamento dei dati al titolare reale.

Per il cloud sono stati salvati `install_script`, `start_skill` e i domini `cdn.playwright.dev` e `playwright.download.prss.microsoft.com` necessari agli strumenti di prova. La bozza è salvata; non è stata pubblicata. Rivedere e salvare le impostazioni dell'ambiente, quindi pubblicarlo per attivare la configurazione e lo snapshot. Questa pubblicazione è distinta dal deploy del sito.
