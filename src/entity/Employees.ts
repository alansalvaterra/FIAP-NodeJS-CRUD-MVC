import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CheckInOuts } from "./CheckInOuts"

@Entity()
export class Employees {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    role: string

    @OneToMany(() => CheckInOuts, CheckInOuts => CheckInOuts.employees)
    CheckInOuts: CheckInOuts[];
    
}
