import { uniqueNamesGenerator, Config, names, NumberDictionary, adjectives, colors, animals, countries } from 'unique-names-generator';
import { lottatore } from './entity/lottatore';
import { classifica_piuma } from './entity/classifica_piuma';
import { evento } from './entity/evento';
import { record } from './entity/record';
import { scontro } from './entity/scontro';
import { sponsorizzazioni } from './entity/sponsorizzazioni';
import { storicoEventi } from './entity/storicoEventi';
import { storicoScontri } from './entity/storicoScontri';
import { team } from './entity/team';
import { Any, BeforeInsert, DataSource } from 'typeorm';
import { classifica_welterweight } from './entity/classifica_welterweight';
import { classifica_medio } from './entity/classifica_medio';
import { classifica_massimi } from './entity/classifica_massimi';

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
            Team.nome_responsabile = uniqueNamesGenerator(config = {dictionaries: [names], style: 'capital'});
            Team.origine = uniqueNamesGenerator(config = {dictionaries: [countries]});
            Team.nome = uniqueNamesGenerator(config = {dictionaries: [colors, animals]});

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
            Lottatore.nome = uniqueNamesGenerator(config = {dictionaries: [names], style: 'capital'});
            Lottatore.cognome = uniqueNamesGenerator(config = {dictionaries: [names], style: 'capital'});
            Lottatore.peso = (Math.random() * (94 - 57) + 57);
            Lottatore.arteMarziale = uniqueNamesGenerator(config = {dictionaries: [artiMarziali]});
            Lottatore.dataNascita = new Date((Math.random() * (2003 - 1970) + 1970), (Math.random() * (12)), (Math.random() * 30));
            Lottatore.codiceFiscale = ([i, Lottatore.nome, Lottatore.cognome]).join('');
            Lottatore.team = uniqueNamesGenerator(config = {dictionaries: [this.teams]});

            this.populateRecord(Lottatore.codiceFiscale);

            if (Lottatore.peso <= 65) {
                Lottatore.categoria = "PesoPiuma";
                this.populateClassificaPiuma(Lottatore.codiceFiscale, 
                    Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
            } else if (Lottatore.peso > 65 && Lottatore.peso <= 77) {
                Lottatore.categoria = "Welterweight";
                this.populateClassificaWelterweight(Lottatore.codiceFiscale, 
                    Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
            } else if (Lottatore.peso > 77 && Lottatore.peso <= 84) {
                Lottatore.categoria = "PesoMedio";
                this.populateClassificaMedio(Lottatore.codiceFiscale, 
                    Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
            } else {
                Lottatore.categoria = "PesiMassimi";
                this.populateClassificaMassimi(Lottatore.codiceFiscale, 
                    Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
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

    async populateClassificaPiuma(codiceFiscale: string, peso: number, nome: string, cognome: string, arteMarziale: string) {
        let classifica = new classifica_piuma();

        classifica.codiceFiscale = codiceFiscale;
        classifica.peso = peso;
        classifica.arteMarziale = arteMarziale;
        classifica.cognome = cognome;
        classifica.nome = nome;

        await this.AppDataSource.manager.save(classifica);

    }

    async populateClassificaWelterweight(codiceFiscale: string, peso: number, nome: string, cognome: string, arteMarziale: string) {
        let classifica = new classifica_welterweight();

        classifica.codiceFiscale = codiceFiscale;
        classifica.peso = peso;
        classifica.arteMarziale = arteMarziale;
        classifica.cognome = cognome;
        classifica.nome = nome;

        await this.AppDataSource.manager.save(classifica);

    }

    async populateClassificaMedio(codiceFiscale: string, peso: number, nome: string, cognome: string, arteMarziale: string) {
        let classifica = new classifica_medio();

        classifica.codiceFiscale = codiceFiscale;
        classifica.peso = peso;
        classifica.arteMarziale = arteMarziale;
        classifica.cognome = cognome;
        classifica.nome = nome;

        await this.AppDataSource.manager.save(classifica);

    }

    async populateClassificaMassimi(codiceFiscale: string, peso: number, nome: string, cognome: string, arteMarziale: string) {
        let classifica = new classifica_massimi();

        classifica.codiceFiscale = codiceFiscale;
        classifica.peso = peso;
        classifica.arteMarziale = arteMarziale;
        classifica.cognome = cognome;
        classifica.nome = nome;

        await this.AppDataSource.manager.save(classifica);

    }

    async populateEvento(n: number) {
        let Evento = new evento();

        var config: Config = {
            dictionaries: [adjectives, colors, animals],
        }

        for(let i = 0; i < n; i++) {
            Evento.idEvento = i;
            Evento.dataEvento = new Date((Math.random() * (2023 - 2020) + 1970), (Math.random() * (12)), (Math.random() * 30));
            Evento.luogo = uniqueNamesGenerator(config = {dictionaries: [countries]});
            Evento.nomeStadio = uniqueNamesGenerator(config = {dictionaries: [adjectives, names, colors]});
            Evento.bigliettiPremiumVenduti = Math.random() * (500 - 200) + 200;
            Evento.bigliettiStandardVenduti = Math.random() * (1500 - 600) + 600;
            Evento.costoBigliettiPremium = Math.random() * (400 - 250) + 250;
            Evento.costoBigliettiStandard = Math.random() * (100 - 50) + 50;
            Evento.costoNoleggio = Math.random() * (15000 - 10000) + 10000;
            Evento.oraInizio =  Math.round(Math.random() * (20 - 15) + 15) * 10000;
            Evento.oraFine = Evento.oraInizio + (Math.round(Math.random() * (4-2) + 2) * 10000);
            Evento.spesaStaff = Math.random() * (12000 - 8000) + 8000;
            Evento.sponsor = {
                sponsor1: uniqueNamesGenerator(config = {dictionaries: [this.sponsors]}),
                sponsor2: uniqueNamesGenerator(config = {dictionaries: [this.sponsors]}),
                sponsor3: uniqueNamesGenerator(config = {dictionaries: [this.sponsors]})
            }

            let numScontri = Math.random() * (5-2) + 2;
            for (let k = 0; k < numScontri; k++) {
                this.populateScontro(Evento.idEvento, k);
            }

            await this.AppDataSource.manager.save(Evento).then(() => { 
                this.populateStoricoEventi(Evento.idEvento, Evento.bigliettiPremiumVenduti * Evento.costoBigliettiPremium, 
                    Evento.bigliettiStandardVenduti * Evento.costoBigliettiStandard, Evento.costoNoleggio, Evento.spesaStaff);
            });
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
        Scontro.categoria = uniqueNamesGenerator(config = {dictionaries: [categorie]});
        Scontro.disciplina = uniqueNamesGenerator(config = {dictionaries: [artiMarziali]});

        this.populateStoricoScontri(Scontro.idEvento, Scontro.idScontro);
        await this.AppDataSource.manager.save(Scontro);

    }
    
    async populateSponsorizzazioni(n: number) {
        let sponsor = new sponsorizzazioni();

        var config: Config = {
            dictionaries: [adjectives, colors, animals],
        }

        for(let i = 0; i < n; i++) {
            sponsor.idSponsor = i;
            sponsor.nome = uniqueNamesGenerator( config = {dictionaries: [adjectives, colors, animals]});
            sponsor.pagamentoSponsor = Math.random() * (15000-5000) + 5000;

            this.sponsors.push(sponsor.nome);

            await this.AppDataSource.manager.save(sponsor);
        }
    }

    async populateStoricoEventi(idEvento: number, profittoPremium: number, profittoStandard: number, costoNoleggio: number, 
                                costoStaff: number) {
        let StoricoEventi = new storicoEventi();

        var temp = await this.AppDataSource.manager.getRepository(evento).findOne({
            where: {
                idEvento: idEvento,
            }
        });
        
        var guadagnoSponsor1 =  await this.AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
            where: {
                nome: temp.sponsor.sponsor1,
            }
        });
        
        var guadagnoSponsor2 =  await this.AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
            where: {
                nome: temp.sponsor.sponsor2,
            }
        });

        var guadagnoSponsor3 =  await this.AppDataSource.manager.getRepository(sponsorizzazioni).findOne({
            where: {
                nome: temp.sponsor.sponsor3,
            }
        });

        var spesaScontri = await this.AppDataSource.manager.getRepository(scontro).find({
            where: {
                idEvento: idEvento,
            }
        })

        var spesaScontriTot = 0;

        spesaScontri.forEach(x => {
            spesaScontriTot += (x.pagamentoExtra * 2);
        })

        StoricoEventi.idEvento = idEvento;
        StoricoEventi.introiti = profittoPremium + profittoStandard + guadagnoSponsor1.pagamentoSponsor + 
            guadagnoSponsor2.pagamentoSponsor + guadagnoSponsor3.pagamentoSponsor;
        StoricoEventi.spese = costoNoleggio + costoStaff + spesaScontriTot;
        StoricoEventi.guadagniComplessivi = StoricoEventi.introiti - StoricoEventi.spese;

        await this.AppDataSource.manager.save(StoricoEventi);

    }
    
    async populateStoricoScontri(idEvento: number, idScontro: number) {
        let StoricoScontri = new storicoScontri();
        
        var config: Config = {
            dictionaries: [names],
            style: 'capital'
        }

        StoricoScontri.idEvento = idEvento;
        StoricoScontri.idScontro = idScontro;

        StoricoScontri.primoPartecipante = uniqueNamesGenerator(config = {dictionaries: [names], style: 'capital'})
        StoricoScontri.secondoPartecipante = uniqueNamesGenerator(config = {dictionaries: [names], style: 'capital'})

        if (Math.random() > 0.70) {
            StoricoScontri.pareggio = true;
            StoricoScontri.vincitore = null;
            StoricoScontri.perdente = null;
        } else {
            StoricoScontri.pareggio = false;
            if (Math.random() > 0.50) {
                StoricoScontri.vincitore = StoricoScontri.primoPartecipante;
                StoricoScontri.perdente = StoricoScontri.secondoPartecipante;
            } else {
                StoricoScontri.perdente = StoricoScontri.primoPartecipante;
                StoricoScontri.vincitore = StoricoScontri.secondoPartecipante;
            }
        }

        await this.AppDataSource.manager.save(StoricoScontri);

    }
}