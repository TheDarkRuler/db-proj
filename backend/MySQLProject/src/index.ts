import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Lottatore } from './entity/lottatore';

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
    let lottatore = new Lottatore();
    lottatore.nome = "Oracle Magazine";
    lottatore.cognome = "Oracle Publishing";
    lottatore.codiceFiscale = "March-April 2005";
    lottatore.team = "sakfnas";
    lottatore.arteMarziale = "caio";
    lottatore.dataNascita = new Date(1999, 22, 1);
    lottatore.peso = 30;

    await connection.manager.save(lottatore);

}).catch(error => console.log(error));
