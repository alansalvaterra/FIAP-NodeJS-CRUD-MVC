import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { EmployeeCheckInOuts } from "./EmployeeCheckInOuts"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    funcao: string

    @OneToMany(() => EmployeeCheckInOuts, employeeCheckInOuts => EmployeeCheckInOuts.users)
    employeeCheckInOuts: EmployeeCheckInOuts[];
    
}
