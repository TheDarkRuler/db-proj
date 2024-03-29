USE fight_on;

INSERT INTO AMMINISTRATORE (username)
	VALUES ("TheDarkRuler");
    
INSERT INTO TEAM (idTeam, nome, nome_responsabile, origine)
	VALUES($1, $2, $3, $4);

INSERT INTO SPONSORIZZAZIONI (idSponsor, nome, pagamentoSponsor)
	VALUES ($1, $2, $3);

INSERT INTO LOTTATORE (nome, cognome, codiceFiscale, dataNascita, peso, categoria, arteMarziale)
	VALUES ($1, $2, $3, $4, $5, $6, $7);
    
INSERT INTO RECORD (idRecord, vittorie, sconfitte, pareggi)
	VALUES ($1, $2, $3, $4);
    
INSERT INTO CLASSIFICA (nome, cognome, codiceFiscale, peso, arteMarziale)
	VALUES ($1, $2, $3, $4, $5);
    
INSERT INTO DISCIPLINA (nome)
	VALUES ($1);
    
INSERT INTO CATEGORIA (nome, pesoMinimo, pesoMassimo)
	VALUES ($1, $2, $3);
    
INSERT INTO SCONTRO (idScontro, disciplina, categoria, pagamentoExtra)
	VALUES ($1, $2, $3, $4);

INSERT INTO NEWS (idNews, argomento, descrizione)
	VALUES ($1, $2, $3);
    
INSERT INTO STORICO_SCONTRI (idScontro, primoPartecipante, secondoPartecipante, vincitore, perdente, pareggio)
	VALUES ($1, $2, $3, $4, $5, $6);
    
INSERT INTO EVENTO (idEVento, nomeStadio, luogo, costoNoleggio, spesaStaff, dataEvento, oraInizio, oraFine, bigliettiStandardVenduti, bigliettiPremiumVenduti, introitiNetti)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    
INSERT INTO STORICO_EVENTI (idEvento, introiti, spese)
	VALUES ($1, $2, $3);