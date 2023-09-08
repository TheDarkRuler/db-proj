import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../index';
import { lottatore } from '../entity/lottatore';
import { record } from '../entity/record';
import { storico_categorie } from '../entity/storico_categorie';
import { storico_discipline } from '../entity/storico_discipline';
import createController from './createController';

const updateStoricoDisciplina = (temp: string, cf: string, periodo: string) => {

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
    createController.putStoricoDisciplina(temp, cf, "ongoing");
};

const updateStoricoCategoria = (temp: lottatore, periodo: string) => {

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
    createController.putStoricoCategoria(temp, "ongoing");
};

const updateLottatore = async (req: Request, res: Response, next: NextFunction) => {

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
            updateStoricoDisciplina(tempLottatore.disciplina, temp.codiceFiscale, new Date().toDateString());
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
            updateStoricoCategoria(temp, new Date().toDateString());
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

const updateRecord = (vincitore: string, perdente: string) => {
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

const updateRecordPareggio = (primoPart: string, secondoPart: string) => {
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

export default { 
    updateLottatore, updateRecordPareggio, updateRecord
};