import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class storicoEventi {

    @PrimaryColumn('numeric')
    idEvento: number

    @Column('numeric')
    introiti: number

    @Column('numeric')
    spese: number

    @Column('numeric')
    guadagniComplessivi: number

}