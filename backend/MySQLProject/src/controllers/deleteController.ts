import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../index';
import { team } from '../entity/team';
import { lottatore } from '../entity/lottatore';
import { sponsorizzazioni } from '../entity/sponsorizzazioni';
import { record } from '../entity/record';
import { utente } from '../entity/utente';
import { news } from '../entity/news';

const deleteNews = async (req: Request, res: Response, next: NextFunction) => {

    let temp = req.params.id.replace(":","").trim();
    AppDataSource.manager.getRepository(news).delete(temp);
};

const deletePubblicitari = async (req: Request, res: Response, next: NextFunction) => {

    let temp = req.params.username.replace(":","").trim();
    AppDataSource.manager.getRepository(utente).delete(temp);
};

const deleteLottatore = async (req: Request, res: Response, next: NextFunction) => {
    let codiceFiscale = req.params.cf.replace(":","");
    AppDataSource.manager.getRepository(lottatore).delete(codiceFiscale);
    AppDataSource.manager.getRepository(record).delete(codiceFiscale);
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

export default { 
    deletePubblicitari, deleteNews, deleteLottatore, deleteTeam, deleteSponsor
};