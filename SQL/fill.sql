USE fight_on;

INSERT INTO LOTTATORE (nome, cognome, codiceFiscale, team, dataNascita, peso, arteMarziale)
	VALUES ($1, $2, $3, $4, $5, $6, $7);
    
INSERT INTO RECORD (vittorie, sconfitte, pareggi)
	VALUES ($1, $2, $3);
    
INSERT INTO CLASSIFICA (nome, cognome, punteggio)
	VALUES ($1, $2, $3);
    
INSERT INTO DISCIPLINA (nome)
	VALUES ($1);
    
INSERT INTO CATEGORIA (nome)
	VALUES ($1);
    
INSERT INTO SCONTRO (idScontro, disciplina, categoria, pagamentoExtra)
	VALUES ($1, $2, $3, $4);
    
INSERT INTO STORICO_SCONTRI (idScontro, primoPartecipante, secondoPartecipante, vincitore, perdente, pareggio)
	VALUES ($1, $2, $3, $4, $5, $6);
    
INSERT INTO EVENTO (idEVento, nomeStadio, luogo, costoNoleggio, spesaStaff, dataEvento, oraInizio, oraFine, bigliettiStandardVenduti, bigliettiPremiumVenduti, introitiNetti)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    
INSERT INTO STORICO_EVENTI (idEvento, introiti, spese)
	VALUES ($1, $2, $3);