import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class record {

    @PrimaryColumn('text')
    codiceFiscale: string

    @Column('numeric')
    vittorie: number

    @Column('numeric')
    sconfitte: number

    @Column('numeric')
    pareggi: number

}