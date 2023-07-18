import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class evento {

    @PrimaryGeneratedColumn()
    idEvento: number

    @Column({
        length: 40
    })
    nome_stadio: string

    @Column({
        length: 40
    })
    luogo: string

    @Column()
    costoNoleggio: number

    @Column()
    spesaStaff: number

    @Column()
    dataEvento: Date

    @Column()
    oraInizio: number

    @Column()
    oraFine: number

    @Column()
    bigliettiStandardSold: number

    @Column()
    bigliettiPremiumSold: number

    @Column()
    introitiNetti: number

}