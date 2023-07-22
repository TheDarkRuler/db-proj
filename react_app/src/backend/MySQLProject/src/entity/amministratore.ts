import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class amministratore {

    @PrimaryColumn({
        length: 20
    })
    username: string

}