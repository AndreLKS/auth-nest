import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Companies } from "../companies/companies.entity";


@Entity({ name: "employees" })
export class Employees {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ type: "bigint" })
    pis: number

    @ManyToOne(type => Companies)
    company: Companies;
    
    @Column()
    userId: number;

    @Column()
    onPremiseId: string;

    @Column({default: true})
    active: boolean;

}
