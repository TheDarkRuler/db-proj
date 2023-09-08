import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../index';
import { team } from '../entity/team';
import { lottatore } from '../entity/lottatore';
import { sponsorizzazioni } from '../entity/sponsorizzazioni';
import { evento } from '../entity/evento';
import { record } from '../entity/record';
import { scontro } from '../entity/scontro';
import { utente } from '../entity/utente';
import { news } from '../entity/news';
import { storico_categorie } from '../entity/storico_categorie';
import { storico_discipline } from '../entity/storico_discipline';
import updateController from './updateController';

const putUtente = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new utente;
    temp.username = req.params.username.replace(":","").trim();
    temp.passw = req.params.password.replace(":","").trim();
    temp.tipo = "Utente";
    AppDataSource.manager.getRepository(utente).save(temp);
};


const putNews = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new news;
    temp.idNews = (await AppDataSource.manager.getRepository(news).find()).length;
    temp.argomento = req.params.argomento.replace(":","");
    temp.descrizione = req.params.descrizione.replace(":","");
    temp.scrittore = req.params.username.replace(":","");
    AppDataSource.manager.getRepository(news).save(temp);
};

const putPubblicitari = async (req: Request, res: Response, next: NextFunction) => {

    let temp = new utente;
    temp.username = req.params.username.replace(":","").trim();
    temp.passw = req.params.password.replace(":","").trim();
    temp.tipo = "Pubblicitario";
    AppDataSource.manager.getRepository(utente).save(temp);
};

const putStoricoCategoria = (temp: lottatore, periodo: string) => {
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

const putStoricoDisciplina = (temp: string, cf: string, periodo: string) => {
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
    putStoricoDisciplina(req.params.disciplina.replace(":",""), temp.codiceFiscale, "ongoing");
    temp.peso = parseInt(req.params.peso.replace(":","").trim());
    putStoricoCategoria(temp, "ongoing");
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

const putTeam = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new team;
    temp.idTeam = (await AppDataSource.manager.find(team)).length;
    temp.nome = req.params.TeamName.replace(":","");
    temp.nome_responsabile = req.params.CeoName.replace(":","");
    temp.origine = req.params.Countrie.replace(":","");
    AppDataSource.manager.save(temp);
};

const putSponsor = async (req: Request, res: Response, next: NextFunction) => {
    let temp = new sponsorizzazioni;
    temp.idSponsor = (await AppDataSource.manager.find(sponsorizzazioni)).length;
    temp.nome = req.params.nome.replace(":","");
    temp.pagamentoSponsor = parseInt(req.params.pagamento.replace(":",""));
    AppDataSource.manager.save(temp);
};

const putRightTime = (time: number) => {
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
    temp.oraInizio = putRightTime(jTemp.start);
    temp.oraFine = putRightTime(jTemp.end);
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
    temp.pareggio? updateController.updateRecordPareggio(temp.primoPartecipante, temp.secondoPartecipante) : 
        updateController.updateRecord(temp.vincitore, temp.perdente);
    AppDataSource.manager.getRepository(scontro).save(temp);
}

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

export default { 
    putUtente, putPubblicitari, putNews, putLottatore, putTeam, putSponsor, 
    putEventoIIScontri, putEventoIIIScontri, putEventoIVScontri, putEventoVScontri, 
    putStoricoCategoria, putStoricoDisciplina
};