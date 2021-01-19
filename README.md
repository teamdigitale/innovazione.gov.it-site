# Come iniziare

Il progetto è costruito sul generatore di siti statici [Middleman](https://middlemanapp.com/).

Per installare l’ambiente necessario allo sviluppo è necessario avere installato
sul proprio sistema i seguenti pacchetti:

* [asdf](https://asdf-vm.com/#/),
* [bundler](https://bundler/),
* [Yarn](https://yarnpkg.com/).

Successivamente, bisogna lanciare i comandi seguenti:

```sh
asdf install
bundle
yarn
```

Una volta installati tutti i pacchetti necessari, bisogna creare un file di
configurazione `.env`:

```sh
BUILD_ENV=production
DATO_API_TOKEN={{inserire la chiave API di sola lettura da DatoCMS}}
BASE_URL=http://localhost:4567/
```

A questo punto, il sito può essere testato in ambiente locale utilizzando
il seguente comando:

`bundle exec middleman`

In questo modo il sito sarà disponibile all’indirizzo http://localhost:4567/.

# Lint

Per eseguire il controllo linting dei file .slim, esegui questo comando:

```sh
$ slim-lint source/**/*.slim
```

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
