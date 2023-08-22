DROP DATABASE IF EXISTS fight_on;
CREATE DATABASE fight_on;
USE fight_on;

DROP TABLE IF EXISTS AMMINISTRATORE;
CREATE TABLE AMMINISTRATORE (
	username varchar(30) NOT NULL PRIMARY KEY
);

DROP TABLE IF EXISTS LOTTATORE;
CREATE TABLE LOTTATORE (
	codiceFiscale varchar(50) NOT NULL,
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
    dataNascita date NOT NULL,
    team varchar(40),
    peso float NOT NULL,
    categoria varchar(20) NOT NULL,
    arteMarziale ENUM('BJJ', 'MMA', 'MuayThai') NOT NULL,
    PRIMARY KEY (codiceFiscale)
);

DROP TABLE IF EXISTS TEAM;
CREATE TABLE TEAM (
	idTeam integer NOT NULL,
	nome varchar(50) NOT NULL,
    nome_responsabile varchar(20),
    origine varchar(40),
    PRIMARY KEY (idTeam)
);

DROP TABLE IF EXISTS RECORD;
CREATE TABLE RECORD (
	codiceFiscale varchar(50) NOT NULL,
	vittorie integer,
    sconfitte integer,
    pareggi integer,
    PRIMARY KEY (codiceFiscale)
);

DROP TABLE IF EXISTS CLASSIFICA_PIUMA;
CREATE TABLE CLASSIFICA_PIUMA (
	codiceFiscale varchar(50) NOT NULL,
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
    peso float NOT NULL,
    arteMarziale ENUM('BJJ', 'MMA', 'MuayThai') NOT NULL,
	PRIMARY KEY (codiceFiscale)
);

DROP TABLE IF EXISTS CLASSIFICA_WELTERWEIGHT;
CREATE TABLE CLASSIFICA_WELTERWEIGHT (
	codiceFiscale varchar(50) NOT NULL,
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
    peso float NOT NULL,
    arteMarziale ENUM('BJJ', 'MMA', 'MuayThai') NOT NULL,
	PRIMARY KEY (codiceFiscale)
);

DROP TABLE IF EXISTS CLASSIFICA_MEDIO;
CREATE TABLE CLASSIFICA_MEDIO (
	codiceFiscale varchar(50) NOT NULL,
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
    peso float NOT NULL,
    arteMarziale ENUM('BJJ', 'MMA', 'MuayThai') NOT NULL,
	PRIMARY KEY (codiceFiscale)
);

DROP TABLE IF EXISTS CLASSIFICA_MASSIMI;
CREATE TABLE CLASSIFICA_MASSIMI (
	codiceFiscale varchar(50) NOT NULL,
	nome varchar(20) NOT NULL,
    cognome varchar(30) NOT NULL,
    peso float NOT NULL,
    arteMarziale ENUM('BJJ', 'MMA', 'MuayThai') NOT NULL,
	PRIMARY KEY (codiceFiscale)
);

DROP TABLE IF EXISTS DISCIPLINA;
CREATE TABLE DISCIPLINA (
	nome ENUM('BJJ','MMA','MuayThai') PRIMARY KEY
);

DROP TABLE IF EXISTS CATEGORIA;
CREATE TABLE CATEGORIA (
	nome ENUM('PesoPiuma','Welterweight','PesoMedio','PesiMassimi') PRIMARY KEY,
    pesoMinimo integer,
    pesiMassimi integer 
);

DROP TABLE IF EXISTS SCONTRO;
CREATE TABLE SCONTRO (
    idEvento integer NOT NULL,
	idScontro integer NOT NULL,
    disciplina ENUM('BJJ','MMA','MuayThai'),
    categoria ENUM('PesoPiuma','Welterweight','PesoMedio','PesiMassimi'),
    pagamentoExtra float,
    PRIMARY KEY (idEvento, idScontro)
);

DROP TABLE IF EXISTS STORICO_SCONTRI;
CREATE TABLE STORICO_SCONTRI (
    idEvento integer NOT NULL,
	idScontro integer NOT NULL,
    primoPartecipante varchar(50) NOT NULL,
    secondoPartecipante varchar(50) NOT NULL,
    vincitore varchar(50),
    perdente varchar(50),
    pareggio bool,
    PRIMARY KEY (idScontro, idEvento),
	CONSTRAINT PAREGGIO CHECK ((pareggio IS TRUE AND vincitore IS NULL AND perdente IS NULL) OR
		(pareggio IS FALSE AND vincitore IS NOT NULL AND perdente IS NOT NULL))
);

DROP TABLE IF EXISTS EVENTO;
CREATE TABLE EVENTO (
	idEvento integer NOT NULL,
    nomeStadio varchar(40) NOT NULL,
    luogo varchar (50) NOT NULL,
    costoNoleggio float,
    spesaStaff float,
    dataEvento date NOT NULL,
    oraInizio varchar(10) NOT NULL,
    oraFine varchar(10) NOT NULL,
    bigliettiStandardVenduti integer,
    bigliettiPremiumVenduti integer,
    costoBigliettiPremium integer,
    costoBigliettiStandard integer,
    sponsor JSON,
    PRIMARY KEY (idEvento),
    CONSTRAINT ORARIO CHECK (oraInizio <= oraFine)
);

DROP TABLE IF EXISTS SPONSORIZZAZIONI;
CREATE TABLE SPONSORIZZAZIONI (
	idSponsor integer NOT NULL,
    nome varchar(40) NOT NULL,
    pagamentoSponsor float,
    PRIMARY KEY (idSponsor)
);

DROP TABLE IF EXISTS STORICO_EVENTI;
CREATE TABLE STORICO_EVENTI (
	idEvento integer NOT NULL,
    introiti float,
    spese float,
    guadagniComplessivi float,
    PRIMARY KEY (idEvento)
);