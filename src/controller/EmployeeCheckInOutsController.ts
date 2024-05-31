import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { EmployeeCheckInOuts } from "../entity/EmployeeCheckInOuts"

export class EmployeeCheckInOutsController {

    private employeeCheckInOutsRepository = AppDataSource.getRepository(EmployeeCheckInOuts)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.employeeCheckInOutsRepository.find()
    }
}