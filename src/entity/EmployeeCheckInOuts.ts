import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { Users } from "./Users"

@Entity()
export class EmployeeCheckInOuts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    checkIn: Date

    @Column()
    checkOut: Date

    @Column({ type: 'float', nullable: true })
    workedTime: number

    @ManyToOne(() => Users, (users) => users.employeeCheckInOuts, { eager: true })
    @JoinColumn({ name: 'userId' })
    users: Users;
    static users: any

    @BeforeInsert()
    @BeforeUpdate()
    calculateWorkedTime() {
        if (this.checkIn && this.checkOut) {
            const diffInMillis = this.checkOut.getTime() - this.checkIn.getTime();
            this.workedTime = diffInMillis / (1000 * 60 * 60); // converter milissegundos para horas
        }
    }
}

