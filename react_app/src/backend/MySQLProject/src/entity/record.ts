import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class record {

    @PrimaryColumn()
    codiceFiscale: string

    @Column()
    vittorie: number

    @Column()
    sconfitte: number

    @Column()
    pareggi: number

}