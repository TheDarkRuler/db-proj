import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { utente } from './entity/utente';
import { categoria } from './entity/categoria';
import { disciplina } from './entity/disciplina';
import { populate } from './populate';
import { common } from './common';

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "rootroot1!",
    database: "fight_on",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: false,
    logging: false
});

AppDataSource.initialize().then(async connection => {
    let Utente = new utente();
    let Categoria = new categoria();
    let Disciplina = new disciplina();
    let Populate = new populate(connection);
    let Common = new common();

    Utente.username = "TheDarkRuler";
    Utente.passw = "a";
    Utente.tipo = "Amministratore"
    await connection.manager.save(Utente);

    Utente.username = "utente";
    Utente.passw = "u";
    Utente.tipo = "Utente";
    await connection.manager.save(Utente);

    Utente.username = "pubblicitario";
    Utente.passw = "p";
    Utente.tipo = "Pubblicitario"
    await connection.manager.save(Utente);

    Categoria.nome = "PesoPiuma"
    Categoria.pesoMinimo = null;
    Categoria.pesiMassimi = 65
    await connection.manager.save(Categoria);

    Categoria.nome = "Welterweight"
    Categoria.pesoMinimo = 66
    Categoria.pesiMassimi = 77
    await connection.manager.save(Categoria);

    Categoria.nome = "PesoMedio"
    Categoria.pesoMinimo = 78
    Categoria.pesiMassimi = 84
    await connection.manager.save(Categoria);

    Categoria.nome = "PesiMassimi"
    Categoria.pesoMinimo = 85
    Categoria.pesiMassimi = null;
    await connection.manager.save(Categoria);

    Disciplina.nome = "BJJ"
    await connection.manager.save(Disciplina);

    Disciplina.nome = "MMA"
    await connection.manager.save(Disciplina);

    Disciplina.nome = "MuayThai"
    await connection.manager.save(Disciplina);

    Populate.populateTeam(Common.card_team()).then( () => {

        Populate.populateLottatore(Common.card_lott()).then( () => {

            Populate.populateSponsorizzazioni(Common.card_sponsor()).then( () => {

                Populate.populateEvento(Common.card_evento()).then(() => {
                    
                    Populate.populateNews(Common.card_news());
                });
            });
        });    
    });



}).catch(error => console.log(error));

export default AppDataSource;
