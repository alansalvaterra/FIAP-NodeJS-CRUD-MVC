import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Employees } from "../entity/Employees"

export class EmployeesController {

    private employeeRepository = AppDataSource.getRepository(Employees)

    async all(req: Request, res: Response, next: NextFunction) {
        return this.employeeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const employee = await this.employeeRepository.findOne({
            where: { id }
        })

        if (!employee) {
            return "unregistered employee"
        }
        return employee
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const employee = Object.assign(new Employees(), {
            firstName,
            lastName,
            age
        })

        return this.employeeRepository.save(employee)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let employeeToRemove = await this.employeeRepository.findOneBy({ id })

        if (!employeeToRemove) {
            return "this employee not exist"
        }

        await this.employeeRepository.remove(employeeToRemove)

        return "employee has been removed"
    }

}