# Sito web del Ministro per l'innovazione tecnologica e la transizione digitale

## Come iniziare

Il progetto è compilato attraverso il generatore di siti statici [Middleman](https://middlemanapp.com/).

Per installare l’ambiente necessario allo sviluppo è necessario avere installato sul proprio sistema i seguenti _package manager_:

- [Bundler](https://bundler.io/)
- [Yarn](https://yarnpkg.com/)

Una volta installati i _package manager_, è necessario eseguire i seguenti comandi:

```sh
bundle
yarn
```

e creare un file di configurazione `.env` personalizzato per la propria macchina:

```sh
BUILD_ENV=production
BASE_URL=http://localhost:4567/
DATO_API_TOKEN={{inserire la chiave API di sola lettura da DatoCMS}}
```

Il sito può essere testato in ambiente locale eseguendo il seguente comando:

`bundle exec middleman`

In questo modo il sito sarà disponibile all’indirizzo http://localhost:4567/.

## Maggiori informazioni

Ulteriori dettagli di implementazione del sito sono reperibili nella [Wiki di progetto](https://github.com/teamdigitale/innovazione.gov.it-site/wiki).

## MIGRATIONS

Per una overview utilizzare il client dato per creare / eseguire migrations consultare la [Guida](https://www.datocms.com/docs/scripting-migrations/installing-the-cli)

Add a variable named `DATOCMS_API_TOKEN` to your `.env` file to be detected by the client

```
DATOCMS_API_TOKEN=MIGRATION-TOKEN-HERE
```

### Eseguire una migrazione su un environment esistente

```bash
npx datocms migrations:run --source=develop --in-place
```

NB. Prima di eseguire migrazioni in produzione è necessario effettuare un salvataggio dell'environment precedente, e attivare la modalità di manutenzione.
