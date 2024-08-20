import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employees } from "../employees/employees.entity";


@Entity({ name: "punches" })
export class Punches {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    date: Date;

    @Column('time')
    time: Date;

    @Column()
    timeAsMinutes: number;

    @ManyToOne(type => Employees)
    employee: Employees;
    
    @Column({nullable: true})
    ipAddress: string;

    @Column({nullable: true})
    deviceInfo: string;

    @Column({nullable: true})
    latitude: string;

    @Column({nullable: true})
    longitude: string;

    @Column({nullable: true, default: false})
    exported: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.exported = false;
    }
}
