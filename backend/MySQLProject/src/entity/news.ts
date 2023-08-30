import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class news {

    @PrimaryColumn('numeric')
    idNews: number

    @Column('text')
    argomento: string

    @Column('text')
    descrizione: string

    @Column('text')
    scrittore: string
}