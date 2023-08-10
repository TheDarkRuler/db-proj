import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class classifica_massimi {

    @PrimaryColumn('text')
    codiceFiscale: string

    @Column('text')
    nome: string

    @Column('text')
    cognome: string

    @Column('numeric')
    peso: number

    @Column('text')
    arteMarziale: string

}