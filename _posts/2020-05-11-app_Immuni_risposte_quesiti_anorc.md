---
layout: post
title: "Le risposte ai quesiti posti dall’ANORC (Associazione Nazionale Operatori e Responsabili della Custodia di contenuti digitali) 24 aprile 2020" 
ref: risposte-quesiti-anorc
lang: it
excerpt_separator: <!-- MORE -->
asset: 
pinned:  
categories:
hidden: true
---


<!-- MORE -->

**Perché il governo ha scelto di acquisire in licenza il software?**


La società Bending Spoons S.p.a. che ha sviluppato la soluzione “Immuni”, con il contratto stipulato in data 16 aprile 2020, previa adozione dell’ordinanza del Commissario straordinario Arcuri n. 10/2020, per spirito di solidarietà e, quindi, al solo ed esclusivo scopo di fornire un proprio contributo, volontario e personale, utile per fronteggiare l’emergenza da COVID-19 in atto e contribuire alle azioni di contenimento che il Governo intende porre in essere, ha concesso la licenza d’uso aperta, gratuita, perpetua e irrevocabile del codice sorgente e di tutte le componenti dell’app “Immuni”, nonché si è impegnata, sempre gratuitamente e _pro bono_, a completare gli sviluppi software necessari per la messa in esercizio del sistema nazionale di _contact tracing_ digitale, per la durata di sei mesi e comunque nel limite di 10.000 ore/uomo.


**La licenza open source sarà di tipo GPL, ricomprendendo tutti i codici sorgenti e le componenti del software, comprese le relative librerie, in modo da rendere il governo italiano completamente autonomo nel suo sviluppo e manutenzione?**


Il codice sorgente del sistema di contact tracing sarà rilasciato con licenza Open Source MPL 2.0, come software libero e aperto. 


**Quali saranno i <ins>flussi di dati personali</ins> nell’applicazione e nella sottostante infrastruttura?**


Il Sottogruppo “Profili giuridici della gestione dei dati connessa all’emergenza” (preposto alla valutazione dei vincoli normativi per l’utilizzazione e la condivisione dei dati personali nell’ambito delle soluzioni tecnologiche di contenimento) ha proceduto ad approfondite analisi e ha condiviso i primi risultati del proprio lavoro con il Garante per la protezione dei dati personali.


Nel rispetto delle raccomandazioni emanate dalla Commissione Europea il 16 aprile 2020 in merito alle app per il tracciamento di prossimità, si utilizza un approccio tecnologico che permette all’app di espletare la sua funzione senza che siano raccolti dati identificativi degli utenti. 


L’app infatti <ins>NON</ins> raccoglie i seguenti dati personali relativi all’utente che la scarica: nome e cognome, codice fiscale, indirizzo di residenza, numero telefonico, indirizzo email, dati di localizzazione e movimento e identità dei contatti presenti in rubrica.


**Quali saranno i <ins>flussi di informazioni anonime</ins> (indicando i criteri secondo cui  queste siano state stabilite anonime)?**


Sono favorite le soluzioni che presentano maggiori garanzie di interoperabilità e anonimizzazione dei dati personali.  
Con specifico riferimento al funzionamento, si precisa che l’applicazione non accede alla rubrica, non invia SMS e non chiede il numero di telefono all’utente. Una volta attivata, l’app scambia codici generati randomicamente con altri dispositivi che hanno installato l’app, grazie a segnali _Bluetooth Low Energy_. Questi codici non permettono di risalire all’identità dell’utente.


Lo scambio è bidirezionale: ogni _smartphone_ invia il proprio codice randomico e riceve i codici randomici degli smartphone nelle vicinanze, salvandoli nella propria memoria interna. Per rendere il sistema più sicuro, il codice randomico cambia frequentemente. Questo significa che, se anche uno smartphone incrociasse un dispositivo che aveva “visto” in precedenza, il codice randomico ricevuto sarebbe nel frattempo cambiato, impedendo a potenziali malintenzionati di manipolare il sistema per tracciare gli spostamenti di un utente, anche con metodi molto sofisticati, per esempio mettendo antenne Bluetooth in giro per la città.


Raggiunta la finalità perseguita, tutti i dati ovunque e in qualunque forma conservati, con l’eccezione di dati aggregati e pienamente anonimi a fini di ricerca o statistici, sono cancellati con conseguente garanzia assoluta per tutti i cittadini di ritrovarsi, dinanzi a soggetti pubblici e privati, nella medesima condizione nella quale si trovavano in epoca anteriore all’utilizzo della soluzione.


**I codici sorgente saranno pubblicati, in modo da rendere la soluzione riutilizzabile e, controllabile dalla collettività?**


Uno dei presupposti essenziali delle valutazioni e considerazioni poste alla base della scelta dell’app è che l’intero sistema integrato di _contact tracing_ sia interamente gestito da uno o più soggetti pubblici e che il suo codice sia aperto e suscettibile di revisione da qualunque soggetto indipendente voglia studiarlo.


**L’applicazione è stata selezionata e valutata anche sotto l'aspetto dell'accessibilità secondo quanto prevede la normativa nazionale attualmente in vigore?**

L’app è stata progettata secondo standard in campo epidemiologico, di sicurezza informatica e accessibilità per i disabili. 


**Saranno resi pubblici i contratti <ins>stipulati con il fornitore</ins>? Si conferma che l’intera operazione – ivi comprese le attività di sviluppo e manutenzione – possa essere considerata a titolo <ins>gratuito</ins>?**


I contratti con i fornitori non sono nella nostra disponibilità, essendo stipulati dal Commissario.


**Si intende adottare un sistema <ins>decentralizzato</ins> ispirato al protocollo DP3T o <ins>centralizzato</ins> ispirato al protocollo PEPP-PT?**


Il sistema di _contact tracing_, se verrà adottato, dovrà tenere in considerazione l’evoluzione dei sistemi internazionali, oggi ancora non completamente definiti (PEPP-PT, Decentralised Privacy Preserving Proximity Tracing - DP-3T e ROBERT), e in particolare i modelli annunciati da Apple e Google. 


Il funzionamento del  tracciamento di prossimità si basa esclusivamente sulla tecnologia _Bluetooth Low Energy_. 


Questa scelta di progettazione ha due vantaggi rispetto all’approccio legato alla geolocalizzazione:

* è più precisa, in quanto la tecnologia individua solo dispositivi nel raggio di pochi metri e ignora gli altri. Questo permette di evitare di notificare utenti in realtà non a rischio perché non sono entrati in un raggio abbastanza ristretto rispetto a un utente positivo;
* rispetta maggiormente la privacy, in quanto evita di localizzare l’utente. L’app è in grado di determinare che è avvenuto un contatto stretto fra due utenti ma non il luogo in cui esso è avvenuto.


**Quando saranno forniti i dettagli su <ins>finalità e modalità di trattamento</ins>, sui tempi di <ins>conservazione</ins>, sulla tipologia di <ins>dati trattati</ins>, sulle modalità di <ins>pseudonimizzazione</ins>, sulla <ins>circolazione</ins> e disponibilità fisica di questi dati, sulla relativa <ins>DPIA</ins>?**


L’app è focalizzata sul tracciamento di prossimità (anche noto come tracciamento dei contatti) basato su tecnologia _Bluetooth Low Energy_. Questo metodo non ricorre alla geolocalizzazione. Gli obiettivi dell’app sono:

* Avvisare l’utente del suo stato di rischio, nel caso in cui sia stato esposto a un possibile contagio attraverso un contatto con un paziente positivo a COVID-19 oppure se presenta sintomi riconducibili a COVID-19; 
* Fornire all’utente tutte le informazioni necessarie per affrontare la situazione, ad esempio offrendo indicazioni sulla patologia e le azioni di sanità previste e fornendo i contatti del Dipartimento di prevenzione della propria ASL di riferimento. 


L’app recepisce pienamente i suggerimenti contenuti nelle raccomandazioni emanate dalla Commissione Europea il 16 aprile 2020 in merito alle app per il tracciamento di prossimità. In particolare, sfrutta un approccio tecnologico che permette all’app di espletare la sua funzione senza che siano raccolti dati identificativi degli utenti.  
L’app invero non effettua operazioni di profilazione sugli utenti. È importante sottolineare che l’app è stata progettata in modo che, nella fase di tracciamento di prossimità, non possa essere trasformato da chi lo gestisce in uno strumento di sorveglianza o di limitazione della libertà degli utenti. L’app può pertanto essere installata in sicurezza, permettendo ai cittadini di riporvi la fiducia necessaria a garantirne l’ampia adozione.  
L’app si basa sull’installazione volontaria da parte degli utenti e il suo funzionamento termina con la fase di emergenza, con la cancellazione di tutti i dati generati durante il suo funzionamento.


**Come verrà gestito il <ins>divario digitale</ins> che vede una fascia non trascurabile della popolazione sprovvista dei necessari dispositivi per poter scaricare l’app?**


Si intende porre in essere una campagna di sensibilizzazione al fine della maggiore adozione dell’applicazione ma anche una specifica campagna divulgativa tesa a illustrare il funzionamento dell’applicazione medesima, garantendo la partecipazione delle regioni e segnatamente dei sindaci, in modo da coinvolgere le amministrazioni più vicine ai cittadini. 



{:.x-small.text-left}
[<-- Immuni tutto quello che c'è da sapere]({% link _posts/2020-05-11-Immuni-tutto-quello-che-ce-da-sapere.md %})
