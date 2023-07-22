import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class sponsorizzazioni {

    @PrimaryGeneratedColumn()
    idSponsor: number

    @Column({
        length: 30
    })
    nome: string

    @Column()
    pagamentoSponsor: number
}