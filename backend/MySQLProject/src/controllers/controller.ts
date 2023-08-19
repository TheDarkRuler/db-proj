import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../index';
import { team } from '../entity/team';
import { lottatore } from '../entity/lottatore';
import { categoria } from '../entity/categoria';
import { disciplina } from '../entity/disciplina';
import { sponsorizzazioni } from '../entity/sponsorizzazioni';
import { classifica_piuma } from '../entity/classifica_piuma';
import { classifica_welterweight } from '../entity/classifica_welterweight';
import { classifica_medio } from '../entity/classifica_medio';
import { classifica_massimi } from '../entity/classifica_massimi';

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
    let lottatori = [];
    (await result).forEach(x => { lottatori.push(JSON.stringify(x)) });
    return res.json(lottatori);
};

const insertClassifica = (temp: lottatore) => {
    let classifica = new classifica_piuma;
    classifica.arteMarziale = temp.arteMarziale;
    classifica.codiceFiscale = temp.codiceFiscale;
    classifica.cognome = temp.cognome;
    classifica.nome = temp.nome;
    classifica.peso = temp.peso;
    if (temp.peso <= 65) {
        temp.categoria = "PesoPiuma";
        AppDataSource.manager.getRepository(classifica_piuma).save(classifica);
    } else if (temp.peso > 65 && temp.peso <= 77) {
        temp.categoria = "Welterweight";
        AppDataSource.manager.getRepository(classifica_welterweight).save(classifica);
    } else if (temp.peso > 77 && temp.peso <= 84) {
        temp.categoria = "PesoMedio";
        AppDataSource.manager.getRepository(classifica_medio).save(classifica);
    } else {
        temp.categoria = "PesiMassimi";
        AppDataSource.manager.getRepository(classifica_massimi).save(classifica);
    }
}

const putLottatore = async (req: Request, res: Response, next: NextFunction) => {

    let temp = new lottatore;
    temp.nome = req.params.nome.replace(":","");
    temp.cognome = req.params.cognome.replace(":","");
    temp.codiceFiscale = req.params.cf.replace(":","").trim();
    temp.arteMarziale = req.params.disciplina.replace(":","");
    temp.peso = parseInt(req.params.peso.replace(":",""));
    insertClassifica(temp);
    temp.team = req.params.team.replace(":","");
    temp.dataNascita = new Date(req.params.nascita.replace(":",""));
    AppDataSource.manager.save(temp);
};

const deleteLottatore = async (req: Request, res: Response, next: NextFunction) => {
    let codiceFiscale = req.params.cf.replace(":","");
    AppDataSource.manager.getRepository(lottatore).delete(codiceFiscale);
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
    temp.idTeam = (await AppDataSource.manager.find(team)).length + 1;
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
    temp.idSponsor = (await AppDataSource.manager.find(sponsorizzazioni)).length + 1;
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

const putEvento2Scontri = async (req: Request, res: Response, next: NextFunction) => {
};

const putEvento3Scontri = async (req: Request, res: Response, next: NextFunction) => {
};

const putEvento4Scontri = async (req: Request, res: Response, next: NextFunction) => {
};

const putEvento5Scontri = async (req: Request, res: Response, next: NextFunction) => {
};

export default { 
    getLottatori, getFiltedLottatori, putLottatore, deleteLottatore,
    getCategorie, getDiscipline,
    getTeams, putTeam, deleteTeam,
    getSponsor, putSponsor, deleteSponsor,
    putEvento2Scontri, putEvento3Scontri, putEvento4Scontri, putEvento5Scontri
};