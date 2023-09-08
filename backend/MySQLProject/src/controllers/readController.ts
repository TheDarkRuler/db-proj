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

const getNews = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(news).find();
    let News = [];
    (await result).forEach(x => { News.push(JSON.stringify(x)) });
    return res.json(News);
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

const getSponsor = async (req: Request, res: Response, next: NextFunction) => {
    let result = AppDataSource.manager.getRepository(sponsorizzazioni).find();
    let sponsors = [];
    (await result).forEach(x => { sponsors.push(x.nome) });
    sponsors.forEach(x => {
        res.append(x)
    });
    return res.json(sponsors);
};

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
    getUtenti, getUtenteTipo, getPubblicitari, getNews, getLottatori, getFiltedLottatori,
    getCategorie, getDiscipline, getRecord, getTeams, getSponsor, getEventi, getEventoSingolo, 
    getScontriEvento, getPesoPiuma, getWelterWeight, getPesoMedio, getPesiMassimi
};