import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Employees } from "./Employees"

@Entity()
export class CheckInOuts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    checkIn: Date

    @Column()
    checkOut: Date

    @ManyToOne(() => Employees, (employees) => employees.CheckInOuts, { eager: true })
    @JoinColumn({ name: 'userId' })
    employees: Employees;
    static employees: any
}

