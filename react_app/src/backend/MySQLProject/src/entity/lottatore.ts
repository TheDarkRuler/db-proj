import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class lottatore {

    @PrimaryColumn({
        length: 20
    })
    codiceFiscale: string

    @Column({
        length: 20
    })
    nome: string

    @Column({
        length: 40
    })
    team: string

    @Column({
        length: 30
    })
    cognome: string

    @Column({
        length: 20
    })
    categoria: string

    @Column()
    dataNascita: Date

    @Column()
    peso: number

    @Column()
    arteMarziale: string
}