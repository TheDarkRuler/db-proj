import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class record {

    @PrimaryGeneratedColumn()
    idRecord: number

    @Column()
    vittorie: number

    @Column()
    sconfitte: number

    @Column()
    pareggi: number

}