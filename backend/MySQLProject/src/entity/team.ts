import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class team {

    @PrimaryGeneratedColumn()
    idTeam: number

    @Column({
        length: 30
    })
    nome: string

    @Column({
        length: 30
    })
    nome_responsabile: string

    @Column({
        length: 30
    })
    origine: string

}