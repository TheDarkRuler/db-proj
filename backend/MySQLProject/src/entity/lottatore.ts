import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class lottatore {

    @PrimaryColumn('text')
    codiceFiscale: string

    @Column('text')
    nome: string

    @Column('text')
    team: string

    @Column('text')
    cognome: string

    @Column('date')
    dataNascita: Date

    @Column('numeric')
    peso: number
}