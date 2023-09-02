import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class storico_discipline {

    @PrimaryColumn('text')
    codiceFiscale: string

    @PrimaryColumn('text')
    nome_disc: string

    @PrimaryColumn('text')
    periodo: string
}