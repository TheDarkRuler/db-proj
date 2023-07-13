DROP DATABASE IF EXISTS fight_on;
CREATE DATABASE fight_on;
USE fight_on;

CREATE TABLE LOTTATORE (
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
	codiceFiscale varchar(20) NOT NULL,
    team varchar(40),
    dataNascita date NOT NULL,
    peso float NOT NULL,
    arteMarziale SET('BJJ', 'MMA', 'MuayThai') NOT NULL,
    PRIMARY KEY (codiceFiscale)
);

CREATE TABLE RECORD (
	vittorie integer,
    sconfitte integer,
    pareggi integer
);

CREATE TABLE CLASSIFICA (
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
    punteggio integer
);

CREATE TABLE DISCIPLINA (
	nome SET('BJJ','MMA','MuayThai') PRIMARY KEY
);

CREATE TABLE CATEGORIA (
	nome ENUM('PesoPiuma','Welterweight','PesoMedio','PesiMassimi') PRIMARY KEY
);

CREATE TABLE SCONTRO (
	idScontro integer NOT NULL,
    disciplina ENUM('BJJ','MMA','MuayThai'),
    categoria ENUM('PesoPiuma','Welterweight','PesoMedio','PesiMassimi'),
    pagamentoExtra float,
    PRIMARY KEY (idScontro)
);

CREATE TABLE STORICO_SCONTRI (
	idScontro integer NOT NULL,
    primoPartecipante varchar(50) NOT NULL,
    secondoPartecipante varchar(50) NOT NULL,
    vincitore varchar(50),
    perdente varchar(50),
    pareggio bool,
    PRIMARY KEY (idScontro),
	CONSTRAINT PAREGGIO CHECK ((pareggio IS TRUE AND vincitore IS NULL AND perdente IS NULL) OR
		(pareggio IS FALSE AND vincitore IS NOT NULL AND perdente IS NOT NULL))
);

CREATE TABLE EVENTO (
	idEvento integer NOT NULL,
    nomeStadio varchar(40) NOT NULL,
    luogo varchar (50) NOT NULL,
    costoNoleggio float,
    spesaStaff float,
    dataEvento date NOT NULL,
    oraInizio time NOT NULL,
    oraFine time NOT NULL,
    bigliettiStandardVenduti integer,
    bigliettiPremiumVenduti integer,
    introitiNetti float,
    PRIMARY KEY (idEvento),
    CONSTRAINT ORARIO CHECK (oraInizio < oraFine)
);

CREATE TABLE STORICO_EVENTI (
	idEvento integer NOT NULL,
    introiti float,
    spese float,
    PRIMARY KEY (idEvento)
);