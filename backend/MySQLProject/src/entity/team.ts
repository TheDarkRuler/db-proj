import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class team {

    @PrimaryColumn('numeric')
    idTeam: number

    @Column('text')
    nome: string

    @Column('text')
    nome_responsabile: string

    @Column('text')
    origine: string

}