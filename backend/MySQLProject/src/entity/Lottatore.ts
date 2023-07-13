import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Lottatore {

    @PrimaryColumn({
        length: 20
    })
    codiceFiscale: string

    @Column({
        length: 20
    })
    nome: string

    @Column({
        length: 30
    })
    cognome: string

    @Column({
        length: 40
    })
    team: string

    @Column()
    dataNascita: Date

    @Column()
    peso: number

    @Column()
    arteMarziale: string
}