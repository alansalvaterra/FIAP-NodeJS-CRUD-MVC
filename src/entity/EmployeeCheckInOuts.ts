import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { Users } from "./Users"

@Entity()
export class EmployeeCheckInOuts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    checkIn: Date

    @Column()
    checkOut: Date

    @ManyToOne(() => Users, (users) => users.employeeCheckInOuts, { eager: true })
    @JoinColumn({ name: 'userId' })
    users: Users;
    static users: any
}

