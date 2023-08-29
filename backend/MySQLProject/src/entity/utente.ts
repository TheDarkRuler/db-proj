import {Column, Entity, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class utente {

    @PrimaryColumn('text')
    username: string

    @Column('text')
    passw: string

    @Column('text')
    tipo: string

}