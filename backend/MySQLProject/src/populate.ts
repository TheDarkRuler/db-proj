import { uniqueNamesGenerator, Config, names, adjectives, colors, animals, countries } from 'unique-names-generator';
import { lottatore } from './entity/lottatore';
import { evento } from './entity/evento';
import { record } from './entity/record';
import { scontro } from './entity/scontro';
import { sponsorizzazioni } from './entity/sponsorizzazioni';
import { team } from './entity/team';
import { DataSource } from 'typeorm';
import { news } from './entity/news';
import { utente } from './entity/utente';
import { storico_categorie } from './entity/storico_categorie';
import { storico_discipline } from './entity/storico_discipline';

export class populate {

    AppDataSource: DataSource;

    constructor(AppDataSource: DataSource) {
        this.AppDataSource = AppDataSource;
    }

    teams = [];
    sponsors = [];

    async populateTeam(n: number) {
        let Team = new team();

        var config: Config = {
            dictionaries: [names],
            style: 'capital'
        }

        for (let i = 0; i < n; i++) {
            Team.idTeam = i;
            Team.nome_responsabile = uniqueNamesGenerator(config = { dictionaries: [names], style: 'capital' });
            Team.origine = uniqueNamesGenerator(config = { dictionaries: [countries] });
            Team.nome = uniqueNamesGenerator(config = { dictionaries: [colors, animals] });

            this.teams.push(Team.nome);

            await this.AppDataSource.manager.save(Team);
        }

    }

    async populateLottatore(n: number) {
        let Lottatore = new lottatore();

        const artiMarziali = ["BJJ", "MMA", "MuayThai"];

        var config: Config = {
            dictionaries: [names],
            style: 'capital'
        }

        for (let i = 0; i < n; i++) {
            Lottatore.nome = uniqueNamesGenerator(config = { dictionaries: [names], style: 'capital' });
            Lottatore.cognome = uniqueNamesGenerator(config = { dictionaries: [names], style: 'capital' });
            Lottatore.peso = (Math.random() * (94 - 57) + 57);
            Lottatore.codiceFiscale = ([i, Lottatore.nome, Lottatore.cognome]).join('');
            this.populateStoricoDiscipline(Lottatore.codiceFiscale, uniqueNamesGenerator(config = { dictionaries: [artiMarziali] }));
            Lottatore.dataNascita = new Date((Math.random() * (2003 - 1970) + 1970), (Math.random() * (12)), (Math.random() * 30));
            Lottatore.team = uniqueNamesGenerator(config = { dictionaries: [this.teams] });

            this.populateRecord(Lottatore.codiceFiscale);

            if (Lottatore.peso <= 65) {
                this.populateStoricoCategorie(Lottatore.codiceFiscale, "PesoPiuma");
            } else if (Lottatore.peso > 65 && Lottatore.peso <= 77) {
                this.populateStoricoCategorie(Lottatore.codiceFiscale, "Welterweight");
            } else if (Lottatore.peso > 77 && Lottatore.peso <= 84) {
                this.populateStoricoCategorie(Lottatore.codiceFiscale, "PesoMedio");
            } else {
                this.populateStoricoCategorie(Lottatore.codiceFiscale, "PesiMassimi");
            }

            await this.AppDataSource.manager.save(Lottatore);
        }
    }


    async populateRecord(codiceFiscale: string) {
        let Record = new record();

        Record.codiceFiscale = codiceFiscale;
        Record.vittorie = Math.random() * 25;
        Record.sconfitte = Math.random() * 10;
        Record.pareggi = Math.random() * 4;

        await this.AppDataSource.manager.save(Record);
    }

    async populateStoricoCategorie(codiceFiscale: string, categoria: string) {
        let storicoCat = new storico_categorie();

        storicoCat.codiceFiscale = codiceFiscale;
        storicoCat.periodo = "ongoing";
        storicoCat.nome_cat = categoria;

        await this.AppDataSource.manager.save(storicoCat);

    }

    async populateStoricoDiscipline(codiceFiscale: string, disciplina: string) {
        let storicoDisc = new storico_discipline();

        storicoDisc.codiceFiscale = codiceFiscale;
        storicoDisc.periodo = "ongoing";
        storicoDisc.nome_disc = disciplina;

        await this.AppDataSource.manager.save(storicoDisc);

    }

    async populateEvento(n: number) {
        let Evento = new evento();

        var config: Config = {
            dictionaries: [adjectives, colors, animals],
        }

        for (let i = 0; i < n; i++) {
            Evento.idEvento = i;
            Evento.dataEvento = new Date((Math.random() * (2023 - 2020) + 1970), (Math.random() * (12)), (Math.random() * 30));
            Evento.luogo = uniqueNamesGenerator(config = { dictionaries: [countries] });
            Evento.nomeStadio = uniqueNamesGenerator(config = { dictionaries: [adjectives, names, colors] });
            Evento.bigliettiPremiumVenduti = Math.random() * (500 - 200) + 200;
            Evento.bigliettiStandardVenduti = Math.random() * (1500 - 600) + 600;
            Evento.costoBigliettiPremium = Math.random() * (400 - 250) + 250;
            Evento.costoBigliettiStandard = Math.random() * (100 - 50) + 50;
            Evento.costoNoleggio = Math.random() * (15000 - 10000) + 10000;
            Evento.oraInizio = Math.round(Math.random() * (20 - 15) + 15) * 10000;
            Evento.oraFine = Evento.oraInizio + (Math.round(Math.random() * (4 - 2) + 2) * 10000);
            Evento.spesaStaff = Math.random() * (12000 - 8000) + 8000;
            Evento.sponsor = {
                sponsor1: uniqueNamesGenerator(config = { dictionaries: [this.sponsors] }),
                sponsor2: uniqueNamesGenerator(config = { dictionaries: [this.sponsors] }),
                sponsor3: uniqueNamesGenerator(config = { dictionaries: [this.sponsors] })
            }

            let numScontri = Math.random() * (5 - 2) + 2;
            for (let k = 0; k < numScontri; k++) {
                this.populateScontro(Evento.idEvento, k);
            }
            
            await this.getIntroiti(Evento, Evento.bigliettiPremiumVenduti * Evento.costoBigliettiPremium,
                Evento.bigliettiStandardVenduti * Evento.costoBigliettiStandard).then(x => Evento.introiti = x);

            await this.getSpese(Evento.idEvento, Evento.spesaStaff, Evento.costoNoleggio).then(x => Evento.spese = x);

            Evento.guadagniComplessivi = Evento.introiti - Evento.spese;

            await this.AppDataSource.manager.save(Evento);
        }
    }

    async populateScontro(idEvento: number, n: number) {
        let Scontro = new scontro();

        const artiMarziali = ["BJJ", "MMA", "MuayThai"];

        const categorie = ["PesoPiuma", "Welterweight", "PesoMedio", "PesiMassimi"];

        var config: Config = {
            dictionaries: [artiMarziali]
        }

        Scontro.idScontro = n;
        Scontro.idEvento = idEvento;
        Scontro.pagamentoExtra = Math.random() * (3000 - 1000) + 1000;
        Scontro.categoria = uniqueNamesGenerator(config = { dictionaries: [categorie] });
        Scontro.disciplina = uniqueNamesGenerator(config = { dictionaries: [artiMarziali] });
        Scontro.primoPartecipante = uniqueNamesGenerator(config = { dictionaries: [names, names] });
        Scontro.secondoPartecipante = uniqueNamesGenerator(config = { dictionaries: [names, names] });

        
        if (Math.random() > 0.70) {
            Scontro.pareggio = true;
            Scontro.vincitore = null;
            Scontro.perdente = null;
        } else {
            Scontro.pareggio = false;
            if (Math.random() > 0.50) {
                Scontro.vincitore = Scontro.primoPartecipante;
                Scontro.perdente = Scontro.secondoPartecipante;
            } else {
                Scontro.perdente = Scontro.primoPartecipante;
                Scontro.vincitore = Scontro.secondoPartecipante;
            }
        }

        await this.AppDataSource.manager.save(Scontro);

    }

    async populateSponsorizzazioni(n: number) {
        let sponsor = new sponsorizzazioni();

        var config: Config = {
            dictionaries: [adjectives, colors, animals],
        }

        for (let i = 0; i < n; i++) {
            sponsor.idSponsor = i;
            sponsor.nome = uniqueNamesGenerator(config = { dictionaries: [adjectives, colors, animals] });
            sponsor.pagamentoSponsor = Math.random() * (15000 - 5000) + 5000;

            this.sponsors.push(sponsor.nome);

            await this.AppDataSource.manager.save(sponsor);
        }
    }

    async getIntroiti(evento: any, profittoPremium: number, profittoStandard: number) {

        var guadagnoSponsor1 = await this.AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
            where: {
                nome: evento.sponsor.sponsor1,
            }
        });

        var guadagnoSponsor2 = await this.AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
            where: {
                nome: evento.sponsor.sponsor2,
            }
        });

        var guadagnoSponsor3 = await this.AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
            where: {
                nome: evento.sponsor.sponsor3,
            }
        });

        return profittoPremium + profittoStandard + guadagnoSponsor1.pagamentoSponsor +
            guadagnoSponsor2.pagamentoSponsor + guadagnoSponsor3.pagamentoSponsor;
         
    }

    async getSpese(idEvento: number, costoNoleggio: number, costoStaff: number) {

        var spesaScontri = await this.AppDataSource.manager.getRepository(scontro).find({
            where: {
                idEvento: idEvento,
            }
        })

        var spesaScontriTot = 0;

        spesaScontri.forEach(x => {
            spesaScontriTot += (x.pagamentoExtra * 2);
        })

        return costoNoleggio + costoStaff + spesaScontriTot;

    }

    async populateNews(n: number) {

        let News = new news;

        const pubblicitari = [];

        var config: Config = {
            dictionaries: [pubblicitari],
        }

        const temp = this.AppDataSource.manager.getRepository(utente).find({
            where: {
                tipo: "Pubblicitario"
            }
        });

        (await temp).forEach(x => pubblicitari.push(x.username));

        for (let i = 0; i < n; i++) {
            News.idNews = i;
            News.argomento = uniqueNamesGenerator(config = { dictionaries: [adjectives, colors] });
            News.scrittore = uniqueNamesGenerator(config = { dictionaries: [pubblicitari] });
            News.descrizione = uniqueNamesGenerator(config = { dictionaries: [adjectives, adjectives, adjectives, animals] });

            await this.AppDataSource.manager.save(News);
        }
    }
}