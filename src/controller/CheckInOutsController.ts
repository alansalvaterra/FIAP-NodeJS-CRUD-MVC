import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { CheckInOuts } from "../entity/CheckInOuts"

export class CheckInOutsController {

    private CheckInOutsRepository = AppDataSource.getRepository(CheckInOuts)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.CheckInOutsRepository.find()
    }

    //TODO: CONTINUE FROM HERE
}