import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, Collection} from "typeorm";
import { sponsorizzazioni } from "./sponsorizzazioni";
import "reflect-metadata";

@Entity()
export class evento {

    @PrimaryColumn('numeric')
    idEvento: number

    @Column('text')
    nomeStadio: string

    @Column('text')
    luogo: string

    @Column('numeric')
    costoNoleggio: number

    @Column('numeric')
    spesaStaff: number

    @Column('date')
    dataEvento: Date

    @Column('numeric')
    oraInizio: number

    @Column('numeric')
    oraFine: number

    @Column('numeric')
    bigliettiStandardVenduti: number

    @Column('numeric')
    bigliettiPremiumVenduti: number

    @Column('numeric')
    costoBigliettiStandard: number

    @Column('numeric')
    costoBigliettiPremium: number

    @Column('simple-json')
    sponsor: {
        sponsor1: string
        sponsor2: string
        sponsor3: string
    }

    @Column('numeric')
    introiti: number

    @Column('numeric')
    spese: number

    @Column('numeric')
    guadagniComplessivi: number

}