# Come iniziare

Il progetto è costruito sul generatore di siti statici [Middleman](https://middlemanapp.com/).

Per installare l’ambiente necessario allo sviluppo è necessario avere installato
sul proprio sistema i seguenti pacchetti:

* [asdf](https://asdf-vm.com/#/),
* [bundler](https://bundler/),
* [direnv](https://direnv.net/),
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

# Deployment

Bisogna settare le seguenti variabili d'ambiente:

* BASE_URL=https://innovazione.gov.it/
* DATO_API_TOKEN
