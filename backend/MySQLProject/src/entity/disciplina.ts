import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class disciplina {

    @PrimaryColumn('text')
    nome: string

}