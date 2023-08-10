import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class sponsorizzazioni {

    @PrimaryColumn('numeric')
    idSponsor: number

    @Column('text')
    nome: string

    @Column('numeric')
    pagamentoSponsor: number
}