import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class classifica {

    @PrimaryColumn({
        length: 20
    })
    codiceFiscale: string

    @Column({
        length: 20
    })
    nome: string

    @Column({
        length: 30
    })
    cognome: string

    @Column()
    peso: number

    @Column({
        length: 20
    })
    arteMarziale: string

}