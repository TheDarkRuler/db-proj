import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class storicoScontri {

    @PrimaryColumn('numeric')
    idScontro: number

    @PrimaryColumn('numeric')
    idEvento: number

    @Column('text')
    primoPartecipante: string

    @Column('text')
    secondoPartecipante: string

    @Column('text')
    vincitore: string

    @Column('text')
    perdente: string

    @Column('boolean')
    pareggio: boolean

}