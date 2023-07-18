import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class scontro{

    @PrimaryGeneratedColumn()
    idScontro: number

    @Column({
        length: 20
    })
    disciplina: string 

    @Column({
        length: 20
    })
    categoria: string

    @Column()
    pagamentoExtra: number

}