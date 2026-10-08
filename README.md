# Tratto Architetti

Sito vetrina in italiano per uno studio fittizio. Vite e JavaScript vanilla, GSAP con ScrollTrigger e Lenis. Nessun framework UI. I font Archivo, Caveat e IBM Plex Mono sono distribuiti localmente con le licenze OFL.

## Sviluppo

Richiede Node >= 20.19 (ambiente verificato: Node 24). Usa il checkout esistente: ogni task cloud è già isolato, non serve creare un worktree.

```sh
npm ci --cache /tmp/tratto-npm-cache
npm run dev -- --port 5173
```

```sh
npm run build
npm run preview -- --port 5174
```

La build statica è in `dist/`. L'hero è presente anche nell'HTML iniziale per anticipare caricamento e indicizzazione; `src/sections/hero.js` introduce il titolo, mentre `src/sections/entra-in-casa.js` gestisce la coreografia condivisa tra apertura e percorso. Quando si cambia il testo dell'hero, aggiornare anche il corrispondente markup di `index.html`. Gli stili modulari vengono incorporati nell'HTML della build per ridurre il blocco della prima visualizzazione.

## Foto e schizzi

Le cinque foto originali sono conservate in `assets/originali/`. Per rigenerare gli asset, Python 3.12 o successivo:

```sh
python -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements.txt
.venv/bin/python scripts/prepara-immagini.py
```

Lo script non modifica gli originali. Rispetta l'orientamento EXIF, produce AVIF/WebP/JPG e schizzi con la stessa geometria, più 100 segmenti in `src/data/villa-lines.json`. L'anteprima è in `assets/immagini/anteprima-schizzi.jpg`. Genera anche `public/og-tratto.jpg`.

Villa e fronte: lato lungo massimo 1800 px, varianti 800/1400/1800. Le altre: massimo 1400 px, varianti 800/1400. Per rispettare quel limite non vengono ingrandite artificialmente a 1800 px; i descrittori `srcset` esprimono la larghezza effettiva, anche per le foto verticali.

Il civico di salvia viene sfocato prima di generare qualsiasi derivato, nel box normalizzato `0.646,0.454,0.053,0.026`, individuato visivamente sulla foto dopo orientamento EXIF. Si può cambiare con `--salvia-box x,y,w,h`. Non pubblicare la cartella degli originali: la build importa solo i derivati.

`ottimizza-font.py` serve solo a rigenerare i font ottimizzati dai pacchetti Fontsource. La build e la preparazione delle immagini non lo richiedono. Mantiene i glifi italiani e gli assi Archivo 72–100 / 400–800; Caveat è a peso 500.

## Pubblicazione e modulo

Netlify: collegare il repository, comando `npm run build`, cartella `dist`. `netlify.toml` contiene la configurazione. Il modulo HTML statico permette il rilevamento di Netlify Forms; il build Netlify abilita automaticamente l'invio. Verificare che il rilevamento dei form sia attivo nella dashboard e fare un invio di prova dopo il deploy.

Vercel: preset Vite, stessa build e stessa cartella. Impostare `VITE_CONTACT_ENDPOINT` con un endpoint HTTPS che accetti POST `application/x-www-form-urlencoded`, risponda con uno status 2xx e, se su un dominio diverso, abiliti CORS per il sito. La variabile viene incorporata nella build: non inserirvi credenziali. Se non configurato, il modulo informa che non è stato inviato alcun messaggio. Errori di rete mantengono i campi; la conferma viene mostrata solo dopo una risposta positiva.

Prima della pubblicazione definitiva sostituire [CITTÀ], [INDIRIZZO STUDIO], [EMAIL], [TELEFONO], [NUMERO], anche nel JSON-LD. Quando è noto il dominio, impostare una URL assoluta per `og:image` e aggiungere canonical e `og:url`. Adeguare l'informativa sui dati al titolare reale.

## Movimento e controlli

Le animazioni di scroll usano ScrollTrigger; Lenis è sincronizzato con il ticker GSAP. Con movimento ridotto: niente intro, niente Lenis, pin o scrub; apertura fotografica statica e patio finale, senza trasformazioni. I capitoli restano selezionabili e la galleria è navigabile orizzontalmente. Su mobile il percorso ha un pin di circa tre schermate; la galleria usa swipe e scroll snap. I loop principali vengono sospesi fuori dallo schermo.

Il comparatore usa un range nativo collegato al trascinamento, tre preset e le frecce da tastiera. Il menu mobile gestisce focus, Escape e blocco dello scroll. I controlli hanno focus visibile. Per conservare il contrasto AA, le parole iniziali del manifesto usano un grigio più chiaro del #4A4640 proposto. Sfocatura e saturazione usano livelli con filtri statici e dissolvenze; lo sguardo nel patio si sposta tramite trasformazioni dell'immagine.

## Verifiche

Vedi `reports/VERIFICHE.md` per risultati, limiti e report Lighthouse. Gli strumenti di audit non sono dipendenze del sito:

```sh
npm install --prefix .test-tools --cache /tmp/tratto-npm-cache @playwright/test @axe-core/playwright lighthouse
.test-tools/node_modules/.bin/playwright install --with-deps
TEST_BROWSER=chromium node scripts/verifica-browser.mjs
TEST_BROWSER=firefox node scripts/verifica-browser.mjs
TEST_BROWSER=webkit node scripts/verifica-browser.mjs
```

Avviare prima la preview di produzione sulla porta 5174. I test scrivono in `.test-results/`; `TRATTO_TEST_TOOLS`, `TEST_URL`, `CHROMIUM_PATH` e `TEST_OUTPUT` permettono di configurare percorsi e server. WebKit su Linux non sostituisce un test su Safari reale.

La prova di invio simulata usa `scripts/verifica-invio.mjs`: creare una build separata con `NETLIFY=true npm run build -- --outDir .test-results/netlify-dist`, avviarla sulla porta 5175 con `npm run preview -- --port 5175 --outDir .test-results/netlify-dist` e lanciare lo script. Verifica payload, errore 500 e successo 200; non invia messaggi reali.

`node scripts/verifica-focus-galleria.mjs` verifica nei tre motori la CTA finale da tastiera e la sincronizzazione del contatore quando la galleria è bloccata.

La direzione «La soglia» è integrata nella homepage con tutte le sezioni. Il percorso `/proposta/` mostra lo stesso sito completo, con `noindex` per evitare duplicati. Il primo scroll non aggiunge un pin: usa quello del percorso in casa.
