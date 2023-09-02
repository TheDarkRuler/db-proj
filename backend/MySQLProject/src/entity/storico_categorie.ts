import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class storico_categorie {

    @PrimaryColumn('text')
    codiceFiscale: string

    @PrimaryColumn('text')
    nome_cat: string

    @PrimaryColumn('text')
    periodo: string
}