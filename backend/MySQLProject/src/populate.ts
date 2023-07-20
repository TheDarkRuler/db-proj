import { lottatore } from './entity/lottatore';
import { classifica } from './entity/classifica';
import { evento } from './entity/evento';
import { record } from './entity/record';
import { scontro } from './entity/scontro';
import { sponsorizzazioni } from './entity/sponsorizzazioni';
import { storicoEventi } from './entity/storicoEventi';
import { storicoScontri } from './entity/storicoScontri';
import { team } from './entity/team';
import { DataSource } from 'typeorm';

export class populate {

    AppDataSource: DataSource;

    constructor(AppDataSource: DataSource) {
        this.AppDataSource = AppDataSource;
    }

    populateLottatore(n: number) {
        let Lottatore = new lottatore();
    }

    populateClassifica(n: number) {
        let Classifica = new classifica();
    }

    populateEvento(n: number) {
        let Evento = new evento();
    }

    populateRecord(n: number) {
        let Record = new record();
    }

    populateScontro(n: number) {
        let Scontro = new scontro();
    }
    
    populateSponsorizzazioni(n: number) {
        let Sponsorizzazioni = new sponsorizzazioni();
    }

    populateStoricoEventi(n: number) {
        let StoricoEventi = new storicoEventi();
    }
    
    populateStoricoScontri(n: number) {
        let StoricoScontri = new storicoScontri();
    }

    populateTeam(n: number) {
        let Team = new team();
    }


}