# innovazione.gov.it

Sito del Ministro dell’Innovazione

## Come iniziare

Il progetto è costruito sul generatore di siti statici [Jekyll](https://jekyllrb.com/). Per installare l’ambiente necessario allo sviluppo è necessario avere installato sul proprio sistema [Bundler](https://bundler.io/) e lanciare il seguente comando:

`bundle install`

Una volta installati tutti i pacchetti necessari, il sito può essere testato in ambiente locale utilizzando il seguente comando:

`bundle exec jekyll serve`

In questo modo il sito sarà disponibile all’indirizzo http://localhost:4000/.

## Creazione di un nuovo post

Per creare un nuovo post è sufficiente creare un nuovo file `.md` all’interno della cartella `_posts`. Il nome del file dovrà essere composto dalla data di pubblicazione desiderata (se tale data è futura il post non sarà visibile a sito) e un breve titolo nel seguente formato:

`aaaa-mm-gg-esempio-di-titolo-del-post.md`

Il file dovrà contenere un’intestazione seguita dal contenuto del post. Si consiglia di fare riferimento ai post già esistenti nella cartella `_posts` in caso di dubbi su quanto descritto di seguito.

### Intestazione

L’intestazione è racchiusa tra due righe di tre trattini (`---`) e contiene:
```
---
layout: post
lang: it
excerpt_separator: <!-- MORE -->
title: Esempio di titolo del post
ref: esempio-di-titolo-del-post
asset:
pinned:
categories:
  - highlights
  - cittadini
  - pubblica amministrazione
  - imprese
---
```

I primi 3 campi non dovrebbero essere modificati.

I campi `title` e `ref` sono autoesplicativi, mentre le categorie `cittadini`, `pubblica amministrazione` e `imprese` servono a mostrare i post nelle sezioni corrette. La categoria `highlights` fa sì che il post venga mostrato tra i post in evidenza: in sua assenza tale post non comparirà in homepage. Altre eventuali categorie al momento non hanno particolari impatti a sito.

### Testo del post

Finora i post sono tutti composti da video YouTube o Immagine in testa seguiti da testo. Per quanto tale modalità non sia obbligatoria, aiuta ad avere un’armonia visiva nel sito.

#### Video YouTube

Per quanto riguarda i video, è bene non usare embed da altri social diversi da YouTube per rispetto della privacy dei nostri utenti. Per prelevare il codice da un video YouTube, utilizzare "Share" > "Embed" > selezionare "Enable privacy-enhanced mode." e copiare il codice generato nel campo `asset`, come segue:

```
asset: <iframe title="..." width="560" height="315" src="https://www.youtube-nocookie.com/embed/..." frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

#### Immagini

È bene che le immagini usate veicolino un messaggio, siano di buona qualità ed esenti da problemi di copyright, ed abbiano possibilmente dimensioni pari a 960x540. L'immagine principale, obbligatoria, non va inserita nel post ma nel campo `asset`, come segue:

```
asset: <img class="w-100" src="/assets/images/posts/..." alt="..."/>
```

#### Testo

Il testo segue la normale [formattazione Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). L'anteprima visibile in homepage o nelle preview dei post mostra il primo paragafo del post, oppure, se presente il testo speciale `<!-- MORE -->`, tutto il contenuto prima di esso.

### Verifica delle modifiche

Per ogni Pull Request, GitHub (attraverso Netlify) crea automaticamente un ambiente di test compilando le modifiche presenti sul branch in lavorazione. Nella pagina dedicata alla Pull Request sarà quindi visibile un box con una serie di check che dovranno essere tutti verdi.

L'ultimo di questi check è associato alla "deploy preview": una volta terminata la compilazione, cliccando su "details" sarà possibile avere un'anteprima del proprio lavoro.

### Post in homepage

Nella homepage vengono mostrati:

- in alto, il post più recente con attributo `pinned: true`
- i 3 post più recenti con la categoria `highlights`

## Aggiornamento iniziative Repubblica Digitale

La _sorgente dati_ delle iniziative di Repubblica Digitale è il file CSV `_data/iniziative.csv`, che viene generato da un foglio Google scaricabile [qui](https://docs.google.com/spreadsheets/d/1BV95DWqrytq1kSyP2EdFkJ0PSuGM5gdx0jhuS144tQI/gviz/tq?tqx=out:csv&sheet=PubblicazioneSito).

I loghi vengono invece inseriti [qui](https://drive.google.com/drive/u/1/folders/1MSkCvSb2P60_RXwOjgVo-QBL_85Nbun7): ogni logo va adattato e ridimensionato se necessario, incluso nella cartella `assets/images/aderenti-manifesto-rd`, e aggiunto alla lista presente nel file `aderenti_manifesto_rd.yml`

Per aggiornare il file è quindi sufficiente:

- scaricare il file CSV sovrascrivendo l'esistente
- caricare i loghi come descritto
- aggiornare la lista degli aderenti
- verificare sia tutto ok
