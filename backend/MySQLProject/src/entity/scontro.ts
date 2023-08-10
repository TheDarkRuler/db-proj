import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class scontro{

    @PrimaryColumn('numeric')
    idScontro: number

    @PrimaryColumn('numeric')
    idEvento: number

    @Column('text')
    disciplina: string 

    @Column('text')
    categoria: string

    @Column('numeric')
    pagamentoExtra: number

}