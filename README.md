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

## Sviluppo con docker
Buildare il container con il seguente comando:
`docker build . -t innovazione.gov.it`

Assicurarsi di avere il proprio file `.env` correttamente popolato e poi eseguire:
`docker run -it --rm -p4567:4567 --env-file .env innovazione.gov.it --name innovazione.gov.it`

Per utilizzare `docker-compose` sarà necessario aggiornare il proprio file di env con i corretti
UID e GID utilizzando il seguente comando:
`echo RUNAS=$(id -u):$(id -g) >> .env`

Assicurarsi che il `.env` sia corretto e quindi eseguire:
`docker-compose up`

Maggiori informazioni su dettagli di implementazione del sito sono reperibili nella [Wiki di progetto](https://github.com/teamdigitale/innovazione.gov.it-site/wiki).
