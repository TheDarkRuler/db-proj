import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class categoria {

    @PrimaryColumn('text')
    nome: string

    @Column('numeric')
    pesoMinimo: number

    @Column('numeric')
    pesiMassimi: number

}