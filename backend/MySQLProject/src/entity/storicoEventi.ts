import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class storicoEventi {

    @PrimaryColumn()
    idEvento: number

    @Column()
    introiti: number

    @Column()
    spese: number

    @Column()
    guadagniComplessivi: number

}