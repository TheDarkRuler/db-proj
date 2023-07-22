import AppDataSource from './index';
import { populate } from './populate';
import { lottatore } from './entity/lottatore';
import { record } from './entity/record';
import { team } from './entity/team';


export class operations {

    async insertLottatore(codiceFiscale: string, nome: string, cognome: string, dataNascita: Date, peso: number, 
            arteMarziale: string, team:string) {

        let Lottatore = new lottatore();
        let Populate = new populate(AppDataSource);
        let Record = new record();

        Lottatore.codiceFiscale = codiceFiscale;
        Lottatore.nome = nome;
        Lottatore.cognome = cognome;
        Lottatore.dataNascita = dataNascita;
        Lottatore.arteMarziale = arteMarziale;
        Lottatore.team = team;
        Lottatore.peso = peso;

        if (Lottatore.peso <= 65) {
            Lottatore.categoria = "PesoPiuma";
            Populate.populateClassificaPiuma(Lottatore.codiceFiscale, 
                Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
        } else if (Lottatore.peso > 65 && Lottatore.peso <= 77) {
            Lottatore.categoria = "Welterweight";
            Populate.populateClassificaWelterweight(Lottatore.codiceFiscale, 
                Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
        } else if (Lottatore.peso > 77 && Lottatore.peso <= 84) {
            Lottatore.categoria = "PesoMedio";
            Populate.populateClassificaMedio(Lottatore.codiceFiscale, 
                Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
        } else {
            Lottatore.categoria = "PesiMassimi";
            Populate.populateClassificaMassimi(Lottatore.codiceFiscale, 
                Lottatore.peso, Lottatore.nome, Lottatore.cognome, Lottatore.arteMarziale);
        }

        Record.codiceFiscale = Lottatore.codiceFiscale;
        Record.vittorie = 0;
        Record.sconfitte = 0;
        Record.pareggi = 0;

        await AppDataSource.manager.save(Lottatore);
        await AppDataSource.manager.save(Record);
    }

    async getTeams() {
        
        return await AppDataSource.manager.getRepository(team).find({
            select: {
                nome: true,
            }
        });
    }
}