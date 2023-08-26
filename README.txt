FIGHT_ON
-- INIZIALIZZAZIONE:  
Per eseguire l'applicazione sarà necessrio aver installato node.js: https://nodejs.org/en/ 
Come DBMS invece, è stato utilizzato mysql.

In seguito all'installazione di node, sarà necessario installare varie dipendenze, per farlo basterà eseguire i comandi (nella root del progetto):

* npm i
* npm i nodemon react-scripts

Successivamente bisognerà accedere manualmente alla cartella "backend/MySQLProject" e aprire il file "ormconfig.json" dove si dovranno modificare le voci { "host", "port", "username", "password" e "database" }
in base alle proprie esigenze, stesse modifiche andranno poi applicate anche in "index.ts" presente nella cartella "src" ( partendo sempre da backend ), in particolare bisognerà modificare i parametri
passati nella creazione di "AppDataSource = new DataSource()" righe[9-21].

Infine sarà necessario eseguire il comando ( in "db-proj/backend/MySQLProject" ): 

* mysql -u [username] -p[password] -h [host] < SQL/create.sql

sostituendo le parti tra parentesi secondo le proprie esigenze ( nessuno spazio bianco tra 
-p e la password o il comando non funzionerà ), questo eseguirà "create.sql" creando il 
database e le cartelle necessarie.

-- ESECUZIONE:

Per eseguire l'applicazione bisognerà accedere tramite terminale a "/db-proj/backend/MySQLProject" dove andrà eseguito il comando:

* npm run dev

Attendere affinchè non venga stampato a terminale ("The server is running on port {port}").
Senza interrompere l'esecuzione, aprire un nuovo terminale e accedere a "/db-proj/frontend/react_app" ed eseguire il comando:

* npm start

Questo aprirà ( dopo breve tempo ) l'applicazione stessa nel browser predefinito.

-- UTILIZZO:

All'avvio dell'app non sarà necessario nessun tipo di login in quanto il database è pensato per essere utilizzato da una piccola cerchia di utenti per immagazinare dati riguardanti la lega.
Attraverso i bottoni inziali sarà possibile accedere alle classifiche delle diverse categorie oppure alle operazioni di gestione.
Per dare un esempio del funzionamento dell'app, il databse sarà popolato con dati randomici.
