# Sito web del Ministro per l'innovazione tecnologica e la transizione digitale

## Come iniziare

Il progetto è compilato attraverso il generatore di siti statici [Middleman](https://middlemanapp.com/).

Per installare l’ambiente necessario allo sviluppo è necessario avere installato sul proprio sistema i seguenti _package manager_:

* [Bundler](https://bundler.io/)
* [Yarn](https://yarnpkg.com/)

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

## Ambienti

Il sito ha un deploy di produzione live (branch `main` su GitHub Pages) e i contenuti sono presi da DatoCMS.

L'area di amministrazione di DatoCMS ha anche dei trigger per lanciare le build:

| Branch git | Contenuti | Dove | Trigger di build |
| --- | --- | --- | --- |
| `main` | Contenuti _published_ | GitHub Pages | <ul><li>Merge di `main`</li><li>Trigger "PRODUZIONE" di DatoCMS</li></ul> |
| `main` | Contenuti _published_ *DA CONFERMARE* | Vercel ("Production" Deployment) | <ul><li>Merge di `main`</li><li>Trigger "STAGING" di DatoCMS</li></ul> |
| `develop` | Contenuti _published_ & _draft_ | Vercel ("Preview" Deployment) | <ul><li>Push in `develop`</li><li>Trigger "Ambiente di sviluppo" di DatoCMS</li></ul> |
| Feature branch | Contenuti _published_ & _draft_ | Vercel ("Preview" Deployment) | <ul><li>Nuova PR</li><li>Push su feature branch</li></ul>|

## Maggiori informazioni

Ulteriori dettagli di implementazione del sito sono reperibili nella [Wiki di progetto](https://github.com/teamdigitale/innovazione.gov.it-site/wiki).
