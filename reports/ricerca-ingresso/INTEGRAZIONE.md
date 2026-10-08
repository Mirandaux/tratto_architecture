# La soglia nel sito completo

La homepage ora comprende la nuova apertura fotografica e tutte le sezioni originali: percorso in casa, nastri, comparatore, metodo, progetti, manifesto, contatti e footer. Anche `/proposta/` serve il sito completo.

L'apertura condivide la fotografia e il pin del percorso. Menu «Esplora» disponibile su desktop e mobile, con Escape e gestione del focus. Con movimento ridotto, apertura e patio restano statici senza pin. I controlli della galleria sono stati spostati sotto il nuovo header fisso.

Verifica sulla build di produzione in Chromium, a 1440 px, a 360 px e con movimento ridotto: 23 controlli funzionali superati, 12 scansioni axe senza violazioni. Sono stati controllati il salto al contenuto, il menu, i capitoli, i preset e il trascinamento del comparatore, la galleria, il modulo, l'assenza di overflow e il cambio di breakpoint. Risultati in `verifiche-integrazione.json`.

Build riuscita. Le verifiche Lighthouse, Firefox e WebKit del precedente sito non sono state ripetute per questa modifica. L'invio del modulo su Vercel richiede ancora la configurazione di `VITE_CONTACT_ENDPOINT`.
