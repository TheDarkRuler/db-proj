import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class scontro{

    @PrimaryColumn()
    idScontro: number

    @PrimaryColumn()
    idEvento: number

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