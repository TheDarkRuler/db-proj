import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class disciplina {

    @PrimaryColumn({
        length: 20
    })
    nome: string

}