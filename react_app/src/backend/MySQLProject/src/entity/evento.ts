import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, Collection} from "typeorm";
import { sponsorizzazioni } from "./sponsorizzazioni";

@Entity()
export class evento {

    @PrimaryGeneratedColumn()
    idEvento: number

    @Column({
        length: 40
    })
    nomeStadio: string

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
    bigliettiStandardVenduti: number

    @Column()
    bigliettiPremiumVenduti: number

    @Column()
    costoBigliettiStandard: number

    @Column()
    costoBigliettiPremium: number

    @Column('simple-json')
    sponsor: {
        sponsor1: string
        sponsor2: string
        sponsor3: string
    }
}