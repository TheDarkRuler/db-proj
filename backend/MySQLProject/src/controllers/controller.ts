import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../index';
import { team } from '../entity/team';
import { lottatore } from '../entity/lottatore';
import { categoria } from '../entity/categoria';
import { disciplina } from '../entity/disciplina';
import { sponsorizzazioni } from '../entity/sponsorizzazioni';
import { evento } from '../entity/evento';
import { record } from '../entity/record';
import { scontro } from '../entity/scontro';
import { utente } from '../entity/utente';
import { news } from '../entity/news';
import { storico_categorie } from '../entity/storico_categorie';
import { storico_discipline } from '../entity/storico_discipline';

const getUtenti = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(utente).find();
    let utenti = [];
    (await result).forEach(x => { utenti.push(JSON.stringify(x)) });
    return res.json(utenti);
};

const getUtenteTipo = async (req: Request, res: Response, next: NextFunction) => {
    let temp = req.params.username.replace(":","");
    let result = AppDataSource.manager.getRepository(utente).findOne({
        where: {
            username: temp
        }
    });
    let utenti = (await result).tipo;
    return res.json(utenti);
};

const putUtente = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new utente;
    temp.username = req.params.username.replace(":","").trim();
    temp.passw = req.params.password.replace(":","").trim();
    temp.tipo = "Utente";
    AppDataSource.manager.getRepository(utente).save(temp);
};

const getNews = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(news).find();
    let News = [];
    (await result).forEach(x => { News.push(JSON.stringify(x)) });
    return res.json(News);
};

const removeNews = async (req: Request, res: Response, next: NextFunction) => {

    let temp = req.params.id.replace(":","").trim();
    AppDataSource.manager.getRepository(news).delete(temp);
};

const putNews = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new news;
    temp.idNews = (await AppDataSource.manager.getRepository(news).find()).length;
    temp.argomento = req.params.argomento.replace(":","");
    temp.descrizione = req.params.descrizione.replace(":","");
    temp.scrittore = req.params.username.replace(":","");
    AppDataSource.manager.getRepository(news).save(temp);
};

const getPubblicitari = async (req: Request, res: Response, next: NextFunction) => {

    let result = AppDataSource.manager.getRepository(utente).find({
        where: {
            tipo: "Pubblicitario",
        }
    });
    let pubblicitari = [];
    (await result).forEach(x => { pubblicitari.push(x.username) });
    pubblicitari.forEach(x => {
        res.append(x)
    });
    return res.json(pubblicitari);
};

const putPubblicitari = async (req: Request, res: Response, next: NextFunction) => {

    let temp = new utente;
    temp.username = req.params.username.replace(":","").trim();
    temp.passw = req.params.password.replace(":","").trim();
    temp.tipo = "Pubblicitario";
    AppDataSource.manager.getRepository(utente).save(temp);
};

const removePubblicitari = async (req: Request, res: Response, next: NextFunction) => {

    let temp = req.params.username.replace(":","").trim();
    AppDataSource.manager.getRepository(utente).delete(temp);
};

const getLottatori = async (req: Request, res: Response, next: NextFunction) => {

    let result = AppDataSource.manager.getRepository(lottatore).find();
    let lottatori = [];
    (await result).forEach(x => { lottatori.push(x.codiceFiscale) });
    lottatori.forEach(x => {
        res.append(x)
    });
    return res.json(lottatori);
};

const getFiltedLottatori = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(lottatore).find();
    let temp = AppDataSource.manager.getRepository(storico_discipline).find({
        where: {
            periodo: "ongoing"
        }
    });
    let discipline = [];
    (await temp).forEach(x => {
        discipline.push(x);
    })

    let temp_cat = AppDataSource.manager.getRepository(storico_categorie).find({
        where: {
            periodo: "ongoing"
        }
    });
    let categorie = [];
    (await temp_cat).forEach(x => {
        categorie.push(x);
    })
    let lottatori = [];
    (await result).forEach(async x => { 
        let temp = {
            codiceFiscale: x.codiceFiscale,
            nome: x.nome,
            cognome: x.cognome,
            dataNascita: x.dataNascita,
            peso: x.peso,
            team: x.team,
            arteMarziale: discipline.filter(t => t.codiceFiscale === x.codiceFiscale).map(t => t.nome_disc).pop(),
            categoria: categorie.filter(t => t.codiceFiscale === x.codiceFiscale).map(t => t.nome_cat).pop()
        }
        lottatori.push(JSON.stringify(temp));
    });
    return res.json(lottatori);
};

const insertStoricoCategoria = (temp: lottatore, periodo: string) => {
    let storico = new storico_categorie;
    storico.codiceFiscale = temp.codiceFiscale;
    storico.periodo = periodo;
    if (temp.peso <= 65) {
        storico.nome_cat = "PesoPiuma";
    } else if (temp.peso > 65 && temp.peso <= 77) {
        storico.nome_cat = "Welterweight";
    } else if (temp.peso > 77 && temp.peso <= 84) {
        storico.nome_cat = "PesoMedio";
    } else {
        storico.nome_cat = "PesiMassimi";
    }
    AppDataSource.manager.getRepository(storico_categorie).save(storico);
}

const insertStoricoDisciplina = (temp: string, cf: string, periodo: string) => {
    let storico = new storico_discipline;
    storico.codiceFiscale = cf;
    storico.nome_disc = temp,
    storico.periodo = periodo;

    AppDataSource.manager.getRepository(storico_discipline).save(storico);
}

const putLottatore = async (req: Request, res: Response, next: NextFunction) => {

    let temp = new lottatore;
    temp.nome = req.params.nome.replace(":","").trim();
    temp.cognome = req.params.cognome.replace(":","").trim();
    temp.codiceFiscale = req.params.cf.replace(":","").trim();
    insertStoricoDisciplina(req.params.disciplina.replace(":",""), temp.codiceFiscale, "ongoing");
    temp.peso = parseInt(req.params.peso.replace(":","").trim());
    insertStoricoCategoria(temp, "ongoing");
    temp.team = req.params.team.replace(":","");
    temp.dataNascita = new Date(req.params.nascita.replace(":",""));
    AppDataSource.manager.save(temp);
    let tempRecord = new record;
    tempRecord.codiceFiscale = temp.codiceFiscale;
    tempRecord.vittorie = 0;
    tempRecord.sconfitte = 0;
    tempRecord.pareggi = 0;
    AppDataSource.manager.getRepository(record).save(tempRecord); 
};

const editStoricoDisciplina = (temp: string, cf: string, periodo: string) => {

    AppDataSource.manager.getRepository(storico_discipline).findOne({
        where: {
            periodo: "ongoing",
            codiceFiscale: cf
        }
    }).then(x => {
        AppDataSource.manager.getRepository(storico_discipline).delete(x).then(() => {
            let storico = new storico_discipline;
            storico.codiceFiscale = x.codiceFiscale;
            storico.nome_disc = x.nome_disc;
            storico.periodo = periodo;
            AppDataSource.manager.getRepository(storico_discipline).save(storico);
        });
    });
    insertStoricoDisciplina(temp, cf, "ongoing");
};

const ediStoricoCategoria = (temp: lottatore, periodo: string) => {

    AppDataSource.manager.getRepository(storico_categorie).findOne({
        where: {
            periodo: "ongoing",
            codiceFiscale: temp.codiceFiscale
        }
    }).then(x => {
        AppDataSource.manager.getRepository(storico_categorie).delete(x).then(() => {
            let storico = new storico_categorie;
            storico.codiceFiscale = x.codiceFiscale;
            storico.nome_cat = x.nome_cat;
            storico.periodo = periodo;
            AppDataSource.manager.getRepository(storico_categorie).save(storico);
        });
    });
    insertStoricoCategoria(temp, "ongoing");
};

const editLottatore = async (req: Request, res: Response, next: NextFunction) => {

    let tempLottatore = JSON.parse(req.params.tempLottatore.replace(":",""));

    let temp = new lottatore;
    console.log(tempLottatore);
    temp.nome = tempLottatore.nome;
    temp.cognome = tempLottatore.cognome;
    temp.codiceFiscale = tempLottatore.cf;
    await AppDataSource.manager.getRepository(storico_discipline).findOne({
        where: {
            periodo: "ongoing",
            codiceFiscale: temp.codiceFiscale
        }
    }).then(x => {
        if (x.nome_disc !== tempLottatore.disciplina) {
            editStoricoDisciplina(tempLottatore.disciplina, temp.codiceFiscale, new Date().toDateString());
        }
    });
    temp.peso = tempLottatore.peso;
    await AppDataSource.manager.getRepository(storico_categorie).findOne({
        where: {
            periodo: "ongoing",
            codiceFiscale: temp.codiceFiscale
        }
    }).then(x => {
        if (x.nome_cat !== tempLottatore.categoria) {
            ediStoricoCategoria(temp, new Date().toDateString());
        }
    });
    temp.team = tempLottatore.team;
    temp.dataNascita = new Date(tempLottatore.date);
    AppDataSource.manager.getRepository(lottatore).delete(temp.codiceFiscale).then(() => 
        AppDataSource.manager.getRepository(lottatore).save(temp)
    );
    let tempRecord = new record;
    tempRecord = JSON.parse(req.params.tempRecord.replace(":",""));
    tempRecord.codiceFiscale = tempLottatore.cf;
    console.log(tempRecord);
    tempRecord.vittorie = tempRecord.vittorie;
    tempRecord.sconfitte = tempRecord.sconfitte;
    tempRecord.pareggi = tempRecord.pareggi;
    console.log(tempRecord.codiceFiscale);
    AppDataSource.manager.getRepository(record).delete(tempRecord.codiceFiscale).then(() => 
        AppDataSource.manager.getRepository(record).save(tempRecord)
    );
};

const deleteLottatore = async (req: Request, res: Response, next: NextFunction) => {
    let codiceFiscale = req.params.cf.replace(":","");
    AppDataSource.manager.getRepository(lottatore).delete(codiceFiscale);
    AppDataSource.manager.getRepository(record).delete(codiceFiscale);
};

const getRecord = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(record).find();
    let temp: string;
    (await result).forEach(x => {
        if ( x.codiceFiscale === req.params.cf.replace(":", "") ) {
            temp = JSON.stringify(x);
        }
    });
    return res.json(temp);
};

const getCategorie = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(categoria).find();
    let categorie = [];
    (await result).forEach(x => { categorie.push(x.nome) });
    categorie.forEach(x => {
        res.append(x)
    });
    return res.json(categorie);
};

const getDiscipline = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(disciplina).find();
    let discipline = [];
    (await result).forEach(x => { discipline.push(x.nome) });
    discipline.forEach(x => {
        res.append(x)
    });
    return res.json(discipline);
};

const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(team).find();
    let teams = [];
    (await result).forEach(x => { teams.push(x.nome) });
    teams.forEach(x => {
        res.append(x)
    });
    return res.json(teams);
};

const putTeam = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new team;
    temp.idTeam = (await AppDataSource.manager.find(team)).length;
    temp.nome = req.params.TeamName.replace(":","");
    temp.nome_responsabile = req.params.CeoName.replace(":","");
    temp.origine = req.params.Countrie.replace(":","");
    AppDataSource.manager.save(temp);
};

const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id.replace(":","");
    const temp = AppDataSource.manager.getRepository(team).findOne({
        select: {
            idTeam: true,
        },
        where: {
            nome: id,
        }
    });
    AppDataSource.manager.getRepository(team).delete((await temp).idTeam);
};

const getSponsor = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(sponsorizzazioni).find();
    let sponsors = [];
    (await result).forEach(x => { sponsors.push(x.nome) });
    sponsors.forEach(x => {
        res.append(x)
    });
    return res.json(sponsors);
};

const putSponsor = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new sponsorizzazioni;
    temp.idSponsor = (await AppDataSource.manager.find(sponsorizzazioni)).length;
    temp.nome = req.params.nome.replace(":","");
    temp.pagamentoSponsor = parseInt(req.params.pagamento.replace(":",""));
    AppDataSource.manager.save(temp);
};

const deleteSponsor = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id.replace(":","");
    const temp = AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
        select: {
            idSponsor: true,
        },
        where: {
            nome: id,
        }
    });
    AppDataSource.manager.getRepository(sponsorizzazioni).delete((await temp).idSponsor);
};

const insertRightTime = (time: number) => {
    const result = time.toString().replace(/^.*?\:/, "");
    return parseInt(time.toString().replace(/\:.*/, ('0' + result).slice(-2)))*100;
}

const putEvento = async (jTemp: any, idEvento: number, pagEffettuati: number) => {
    let temp = new evento;
    temp.idEvento = idEvento;
    temp.nomeStadio = jTemp.stadio;
    temp.luogo = jTemp.countrie;
    temp.costoNoleggio = parseInt(jTemp.rent);
    temp.spesaStaff = parseInt(jTemp.staff);
    temp.oraInizio = insertRightTime(jTemp.start);
    temp.oraFine = insertRightTime(jTemp.end);
    temp.dataEvento = new Date(jTemp.date);
    temp.sponsor = {
        sponsor1: jTemp.firstSpo,
        sponsor2: jTemp.secondSpo,
        sponsor3: jTemp.thirdSpo
    }
    temp.bigliettiStandardVenduti = parseInt(jTemp.standNum);
    temp.costoBigliettiStandard = parseInt(jTemp.standPrice);
    temp.bigliettiPremiumVenduti = parseInt(jTemp.premNum);
    temp.costoBigliettiPremium = parseInt(jTemp.premPrice);
    temp.introiti = (await putStoricoEventi(jTemp, idEvento, pagEffettuati)).valueOf();
    temp.spese = pagEffettuati + parseInt(jTemp.rent) + parseInt(jTemp.staff);
    temp.guadagniComplessivi = temp.introiti - temp.spese;
    AppDataSource.manager.getRepository(evento).save(temp);
    
}

const putStoricoEventi = async (jTemp: any, idEvento: number, pagEffettuati: number) => {
    let income = 0;
    const sponsors = AppDataSource.manager.getRepository(sponsorizzazioni).find();
    if( jTemp.firstSpo !== undefined ) {
        (await sponsors).forEach(x => { 
            if (x.nome === jTemp.firstSpo) {
                income += x.pagamentoSponsor;
            }});
    };
    if( jTemp.secondSpo !== undefined ) {
        (await sponsors).forEach(x => { 
            if (x.nome === jTemp.secondSpo) {
                income += x.pagamentoSponsor;
            }});
    };
    if( jTemp.thirdSpo !== undefined ) {
        (await sponsors).forEach(x => { 
            if (x.nome === jTemp.thirdSpo) {
                income += x.pagamentoSponsor;
            }});
    };
    return income + (parseInt(jTemp.standNum) * parseInt(jTemp.standPrice)) + 
        (parseInt(jTemp.premNum) * parseInt(jTemp.premPrice));
}

const editRecord = (vincitore: string, perdente: string) => {
    let tempVincitore = new record;
    let tempPerdente = new record;
    tempVincitore.codiceFiscale = vincitore;
    AppDataSource.manager.getRepository(record).findOne({
        where: {
            codiceFiscale: vincitore
        }
    }).then(x => {
        tempVincitore.vittorie = x.vittorie + 1;
        tempVincitore.pareggi = x.pareggi;
        tempVincitore.sconfitte = x.sconfitte;
    });
    AppDataSource.manager.getRepository(record).delete(vincitore).then(() => 
        AppDataSource.manager.getRepository(record).save(tempVincitore)
    );
    tempPerdente.codiceFiscale = perdente;
    AppDataSource.manager.getRepository(record).findOne({
        where: {
            codiceFiscale: vincitore
        }
    }).then(x => {
        tempPerdente.vittorie = x.vittorie;
        tempPerdente.pareggi = x.pareggi;
        tempPerdente.sconfitte = x.sconfitte + 1;
    });
    AppDataSource.manager.getRepository(record).delete(perdente).then(() => 
        AppDataSource.manager.getRepository(record).save(tempPerdente)
    );
}

const editRecordPareggio = (primoPart: string, secondoPart: string) => {
    let tempPrimo = new record;
    let tempSecondo = new record;
    tempPrimo.codiceFiscale = primoPart;
    AppDataSource.manager.getRepository(record).findOne({
        where: {
            codiceFiscale: primoPart
        }
    }).then(x => {
        tempPrimo.vittorie = x.vittorie;
        tempPrimo.pareggi = x.pareggi + 1;
        tempPrimo.sconfitte = x.sconfitte;
    });
    AppDataSource.manager.getRepository(record).delete(primoPart).then(() => 
        AppDataSource.manager.getRepository(record).save(tempPrimo)
    );
    tempSecondo.codiceFiscale = secondoPart;
    AppDataSource.manager.getRepository(record).findOne({
        where: {
            codiceFiscale: secondoPart
        }
    }).then(x => {
        tempSecondo.vittorie = x.vittorie;
        tempSecondo.pareggi = x.pareggi + 1;
        tempSecondo.sconfitte = x.sconfitte;
    });
    AppDataSource.manager.getRepository(record).delete(secondoPart).then(() => 
        AppDataSource.manager.getRepository(record).save(tempSecondo)
    )
}

const putScontro = async (jTemp: any, idEvento: number) => {
    let temp = new scontro;
    temp.categoria = jTemp.categoria;
    temp.disciplina = jTemp.disciplina;
    temp.idScontro = jTemp.numScontro;
    temp.idEvento = idEvento;
    temp.pagamentoExtra = jTemp.pagamento;
    temp.pareggio = jTemp.pareggio;
    temp.vincitore = jTemp.vincitore;
    temp.perdente = jTemp.perdente;
    temp.primoPartecipante = jTemp.primoPart;
    temp.secondoPartecipante = jTemp.secondoPart;
    temp.pareggio? editRecordPareggio(temp.primoPartecipante, temp.secondoPartecipante) : 
        editRecord(temp.vincitore, temp.perdente);
    AppDataSource.manager.getRepository(scontro).save(temp);
}

const getEventi = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(evento).find();
    let eventi = [];
    (await result).forEach(x => { eventi.push(x.idEvento.toString()) });
    eventi.forEach(x => {
        res.append(x)
    });
    return res.json(eventi);
};

const getEventoSingolo = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(evento).findOne({
        where: {
            idEvento: parseInt(req.params.id.replace(":",""))
        }
    })

    return res.json(await result);
};

const putEventoIIScontri = async (req: Request, res: Response, next: NextFunction) => {
    let idEvento = ((await AppDataSource.manager.getRepository(evento).find()).length);
    let scontroI = JSON.parse(req.params.scontroI.replace(":",""));
    let scontroII = JSON.parse(req.params.scontroII.replace(":",""));
    putEvento(JSON.parse(req.params.evento.replace(":","")), idEvento, scontroI.pagamento + scontroII.pagamento);
    putScontro(scontroI, idEvento);
    putScontro(scontroII, idEvento);
};

const putEventoIIIScontri = async (req: Request, res: Response, next: NextFunction) => {
    let idEvento = ((await AppDataSource.manager.getRepository(evento).find()).length);
    let scontroI = JSON.parse(req.params.scontroI.replace(":",""));
    let scontroII = JSON.parse(req.params.scontroII.replace(":",""));
    let scontroIII = JSON.parse(req.params.scontroIII.replace(":",""));
    putEvento(JSON.parse(req.params.evento.replace(":","")), idEvento, scontroI.pagamento + scontroII.pagamento
        + scontroIII.pagamento);
    putScontro(scontroI, idEvento);
    putScontro(scontroII, idEvento);
    putScontro(scontroIII, idEvento);
};

const putEventoIVScontri = async (req: Request, res: Response, next: NextFunction) => {
    let idEvento = ((await AppDataSource.manager.getRepository(evento).find()).length);
    let scontroI = JSON.parse(req.params.scontroI.replace(":",""));
    let scontroII = JSON.parse(req.params.scontroII.replace(":",""));
    let scontroIII = JSON.parse(req.params.scontroIII.replace(":",""));
    let scontroIV = JSON.parse(req.params.scontroIV.replace(":",""));
    putEvento(JSON.parse(req.params.evento.replace(":","")), idEvento, scontroI.pagamento + scontroII.pagamento
        + scontroIII.pagamento + scontroIV.pagamento);
    putScontro(scontroI, idEvento);
    putScontro(scontroII, idEvento);
    putScontro(scontroIII, idEvento);
    putScontro(scontroIV, idEvento);
};

const putEventoVScontri = async (req: Request, res: Response, next: NextFunction) => {
    let idEvento = ((await AppDataSource.manager.getRepository(evento).find()).length);
    let scontroI = JSON.parse(req.params.scontroI.replace(":",""));
    let scontroII = JSON.parse(req.params.scontroII.replace(":",""));
    let scontroIII = JSON.parse(req.params.scontroIII.replace(":",""));
    let scontroIV = JSON.parse(req.params.scontroIV.replace(":",""));
    let scontroV = JSON.parse(req.params.scontroV.replace(":",""));
    putEvento(JSON.parse(req.params.evento.replace(":","")), idEvento, scontroI.pagamento + scontroII.pagamento
        + scontroIII.pagamento + scontroIV.pagamento + scontroV.pagamento);
    putScontro(scontroI, idEvento);
    putScontro(scontroII, idEvento);
    putScontro(scontroIII, idEvento);
    putScontro(scontroIV, idEvento);
    putScontro(scontroV, idEvento);
};

const getScontriEvento = async (req: Request, res: Response, next: NextFunction) => {
    let temp = parseInt(req.params.id.replace(":",""));
    let result = AppDataSource.manager.getRepository(scontro).find({
        where: {
            idEvento: temp,
        }
    });
    let scontri = [];
    (await result).forEach(x => { scontri.push(JSON.stringify(x)) });
    return res.json(scontri);
};

const getPesoPiuma = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(storico_categorie).find({
        where: {
            periodo: "ongoing",
            nome_cat: "PesoPiuma"
        }
    });
    let tempLott = AppDataSource.manager.getRepository(lottatore).find()
    let tempDisc = AppDataSource.manager.getRepository(storico_discipline).find({
        where: {
            periodo: "ongoing"
        }
    });
    let lott = [];
    let discip = [];
    (await tempLott).forEach(x => lott.push(x));
    (await tempDisc).forEach(x => discip.push(x));
    let resultRecord = AppDataSource.manager.getRepository(record).find();
    let tempRecord = [];
    (await resultRecord).forEach(x => tempRecord.push(x));
    let classifica = [];
    (await result).forEach( x => {
        tempRecord.filter(y => y.codiceFiscale === x.codiceFiscale).forEach(async a => {
            let temp = {
                nome: lott.filter(t => t === x.codiceFiscale).map(t => t.nome).pop(),
                cognome: lott.filter(t => t === x.codiceFiscale).map(t => t.cognome).pop(),
                cf: x.codiceFiscale,
                peso: lott.filter(t => t === x.codiceFiscale).map(t => t.peso).pop(),
                arteMarziale: discip.filter(t => t === x.codiceFiscale).map(t => t.nome_disc).pop(),
                vittorie: a.vittorie,
                sconfitte: a.sconfitte,
                pareggi: a.pareggi,
                punteggio: ((a.vittorie * 3) + a.pareggi)
            }
            classifica.push(JSON.stringify(temp));
        });
    });
    return res.json(classifica);
};

const getWelterWeight = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(storico_categorie).find({
        where: {
            periodo: "ongoing",
            nome_cat: "Welterweight"
        }
    });
    let tempLott = AppDataSource.manager.getRepository(lottatore).find()
    let tempDisc = AppDataSource.manager.getRepository(storico_discipline).find({
        where: {
            periodo: "ongoing"
        }
    });
    let lott = [];
    let discip = [];
    (await tempLott).forEach(x => lott.push(x));
    (await tempDisc).forEach(x => discip.push(x));
    let resultRecord = AppDataSource.manager.getRepository(record).find();
    let tempRecord = [];
    (await resultRecord).forEach(x => tempRecord.push(x));
    let classifica = [];
    (await result).forEach( x => {
        tempRecord.filter(y => y.codiceFiscale === x.codiceFiscale).forEach(async a => {
            let temp = {
                nome: lott.filter(t => t === x.codiceFiscale).map(t => t.nome).pop(),
                cognome: lott.filter(t => t === x.codiceFiscale).map(t => t.cognome).pop(),
                cf: x.codiceFiscale,
                peso: lott.filter(t => t === x.codiceFiscale).map(t => t.peso).pop(),
                arteMarziale: discip.filter(t => t === x.codiceFiscale).map(t => t.nome_disc).pop(),
                vittorie: a.vittorie,
                sconfitte: a.sconfitte,
                pareggi: a.pareggi,
                punteggio: ((a.vittorie * 3) + a.pareggi)
            }
            classifica.push(JSON.stringify(temp));
        });
    });
    return res.json(classifica);
};


const getPesoMedio = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(storico_categorie).find({
        where: {
            periodo: "ongoing",
            nome_cat: "PesoMedio"
        }
    });
    let tempLott = AppDataSource.manager.getRepository(lottatore).find()
    let tempDisc = AppDataSource.manager.getRepository(storico_discipline).find({
        where: {
            periodo: "ongoing"
        }
    });
    let lott = [];
    let discip = [];
    (await tempLott).forEach(x => lott.push(x));
    (await tempDisc).forEach(x => discip.push(x));
    let resultRecord = AppDataSource.manager.getRepository(record).find();
    let tempRecord = [];
    (await resultRecord).forEach(x => tempRecord.push(x));
    let classifica = [];
    (await result).forEach( x => {
        tempRecord.filter(y => y.codiceFiscale === x.codiceFiscale).forEach(async a => {
            let temp = {
                nome: lott.filter(t => t === x.codiceFiscale).map(t => t.nome).pop(),
                cognome: lott.filter(t => t === x.codiceFiscale).map(t => t.cognome).pop(),
                cf: x.codiceFiscale,
                peso: lott.filter(t => t === x.codiceFiscale).map(t => t.peso).pop(),
                arteMarziale: discip.filter(t => t === x.codiceFiscale).map(t => t.nome_disc).pop(),
                vittorie: a.vittorie,
                sconfitte: a.sconfitte,
                pareggi: a.pareggi,
                punteggio: ((a.vittorie * 3) + a.pareggi)
            }
            classifica.push(JSON.stringify(temp));
        });
    });
    return res.json(classifica);
};

const getPesiMassimi = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(storico_categorie).find({
        where: {
            periodo: "ongoing",
            nome_cat: "PesiMassimi"
        }
    });
    let tempLott = AppDataSource.manager.getRepository(lottatore).find()
    let tempDisc = AppDataSource.manager.getRepository(storico_discipline).find({
        where: {
            periodo: "ongoing"
        }
    });
    let lott = [];
    let discip = [];
    (await tempLott).forEach(x => lott.push(x));
    (await tempDisc).forEach(x => discip.push(x));
    let resultRecord = AppDataSource.manager.getRepository(record).find();
    let tempRecord = [];
    (await resultRecord).forEach(x => tempRecord.push(x));
    let classifica = [];
    (await result).forEach( x => {
        tempRecord.filter(y => y.codiceFiscale === x.codiceFiscale).forEach(async a => {
            let temp = {
                nome: lott.filter(t => t === x.codiceFiscale).map(t => t.nome).pop(),
                cognome: lott.filter(t => t === x.codiceFiscale).map(t => t.cognome).pop(),
                cf: x.codiceFiscale,
                peso: lott.filter(t => t === x.codiceFiscale).map(t => t.peso).pop(),
                arteMarziale: discip.filter(t => t === x.codiceFiscale).map(t => t.nome_disc).pop(),
                vittorie: a.vittorie,
                sconfitte: a.sconfitte,
                pareggi: a.pareggi,
                punteggio: ((a.vittorie * 3) + a.pareggi)
            }
            classifica.push(JSON.stringify(temp));
        });
    });
    return res.json(classifica);
};

export default { 
    getUtenti, putUtente, getUtenteTipo, getPubblicitari, putPubblicitari, removePubblicitari, getNews, removeNews, putNews,
    getLottatori, getFiltedLottatori, putLottatore, deleteLottatore, editLottatore,
    getCategorie, getDiscipline, getRecord,
    getTeams, putTeam, deleteTeam,
    getSponsor, putSponsor, deleteSponsor,
    getEventi, getEventoSingolo, putEventoIIScontri, putEventoIIIScontri, putEventoIVScontri, putEventoVScontri, 
    getScontriEvento,
    getPesoPiuma, getWelterWeight, getPesoMedio, getPesiMassimi
};