# Come iniziare

Il progetto è costruito sul generatore di siti statici [Middleman](https://middlemanapp.com/).

Per installare l’ambiente necessario allo sviluppo è necessario avere installato
sul proprio sistema i seguenti pacchetti:

* [bundler](https://bundler/)
* [Yarn](https://yarnpkg.com/)

L'utilizzo di [asdf](https://asdf-vm.com/#/) è opzionale.

Successivamente, bisogna lanciare i comandi seguenti:

```sh
(opzionale) asdf install
bundle
yarn
```

Una volta installati tutti i pacchetti necessari, bisogna creare un file di
configurazione `.env`:

```sh
BUILD_ENV=production
DATO_API_TOKEN={{inserire la chiave API di sola lettura da DatoCMS}}
BASE_URL=http://localhost:4567/
TZ=Europe/Rome
```

A questo punto, il sito può essere testato in ambiente locale utilizzando
il seguente comando:

`bundle exec middleman`

In questo modo il sito sarà disponibile all’indirizzo http://localhost:4567/.

# Lint

## Template SLIM e il suo codice Ruby

Per eseguire il controllo linting dei file .slim, esegui questo comando:

```sh
$ slim-lint source/**/*.slim
```

slim-lint ha due livelli di regole:

* quelle specifiche sulla struttura SLIM nel file `slim-lint.yml`,
* quelle Rubocop che riguardano il codice Ruby contenuto nel file
  `.rubocop.yml`.

## SCSS

Per eseguire il controllo del SCSS, esegui questo comando:

```sh
$ yarn lint:styles
```
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

# Custom Asset Host

Di default, gli URL degli asset puntano a un URL di DatoCMS.

Gli asset di questo progetto vanno recuperati tramite un proxy
a "https://assets.innovazione.gov.it/", **senza** l'elemento
`38008` nel path.

Per questo motivo sono stati implementati degli helper:

* `proxy_link_to`,
* `proxy_image_tag`,
* `proxy_dato_meta_tags`.

che assegnano l'URL corretto del proxy.

Per questo motivo, sono da **evitare** gli helper di default:

* `link_to`,
* `image_tag`,
* `dato_meta_tags`.

# Deployment

Per l'ambiente di produzione, è necessario settare le seguenti variabili d'ambiente:

* BASE_URL=https://innovazione.gov.it/
* DATO_API_TOKEN
