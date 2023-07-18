import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Lottatore } from './entity/lottatore';
import { amministratore } from './entity/amministratore';
import { categoria } from './entity/categoria';
import { disciplina } from './entity/disciplina';

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
    synchronize: true,
    logging: false
});/*.then(async connection => {
    let lottatore = new Lottatore();
    lottatore.nome = "Oracle Magazine";
    lottatore.cognome = "Oracle Publishing";
    lottatore.codiceFiscale = "March-April 2005";
    lottatore.team = "Oracle ADF";
    lottatore.arteMarziale = ["BJJ"];
    lottatore.dataNascita = new Date(1999, 22, 1);
    lottatore.peso = 30;

    await connection.manager.save(lottatore);

}).catch(error => console.log(error));*/

AppDataSource.initialize().then(async connection => {
    let Amministratore = new amministratore();
    let Categoria1 = new categoria();
    let Categoria2 = new categoria();
    let Categoria3 = new categoria();
    let Categoria4 = new categoria();
    let Disciplina1 = new disciplina();
    let Disciplina2 = new disciplina();
    let Disciplina3 = new disciplina();

    Amministratore.username = "TheDarkRuler";
    await connection.manager.save(Amministratore);

    /*Categoria1.nome = "Peso Piuma"
    Categoria1.pesoMassimo = 65
    await connection.manager.save(Categoria1);

    Categoria2.nome = "Welterweight"
    Categoria2.pesoMinimo = 66
    Categoria2.pesoMassimo = 77
    await connection.manager.save(Categoria2);

    Categoria3.nome = "Peso Medio"
    Categoria3.pesoMinimo = 78
    Categoria3.pesoMassimo = 84
    await connection.manager.save(Categoria3);

    Categoria4.nome = "Pesi Massimi"
    Categoria4.pesoMinimo = 85
    await connection.manager.save(Categoria4);

    Disciplina1.nome = "BJJ"
    await connection.manager.save(Categoria1);

    Disciplina2.nome = "MMA"
    await connection.manager.save(Categoria2);

    Disciplina3.nome = "MuayThai"
    await connection.manager.save(Categoria3);*/

}).catch(error => console.log(error));

/*const ciao = AppDataSource.query(`SELECT * FROM lottatore`);
console.log(ciao);*/
