import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class categoria {

    @PrimaryColumn({
        length: 30
    })
    nome: string

    @Column()
    pesoMinimo: number

    @Column()
    pesiMassimi: number

}