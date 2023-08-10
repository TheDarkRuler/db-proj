import {Entity, PrimaryColumn} from "typeorm";
import "reflect-metadata";

@Entity()
export class amministratore {

    @PrimaryColumn('text')
    username: string

}