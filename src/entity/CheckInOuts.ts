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

    @ManyToOne(() => Employees, employee => employee.checkInOuts, { eager: true })
    @JoinColumn({ name: 'employeeId' })
    employee: Employees;

}

