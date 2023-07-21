import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class storicoScontri {

    @PrimaryColumn()
    idScontro: number

    @PrimaryColumn()
    idEvento: number

    @Column({
        length: 20
    })
    primoPartecipante: string

    @Column({
        length: 20
    })
    secondoPartecipante: string

    @Column({
        length: 20
    })
    vincitore: string

    @Column({
        length: 20
    })
    perdente: string

    @Column()
    pareggio: boolean

}