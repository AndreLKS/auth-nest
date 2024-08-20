import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "companies" })
export class Companies {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    inscriptionNumber: string;

    @Column()
    address: string;

    @Column()
    onPremiseId: string;
}
