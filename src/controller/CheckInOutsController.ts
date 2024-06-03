import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { CheckInOuts } from "../entity/CheckInOuts"

export class CheckInOutsController {

    private CheckInOutsRepository = AppDataSource.getRepository(CheckInOuts)

    async all(req: Request, res: Response, next: NextFunction) {
        return this.CheckInOutsRepository.find()
    }

    async one(req: Request, res: Response) {
        const id = parseInt(req.params.id)

        const checkInOuts = await this.CheckInOutsRepository.findOneBy({ id });

        return checkInOuts;
    }

    //TODO: CONTINUE CRUD FROM HERE

    static async renderCheckInOutsPage(req: Request, res: Response, next: NextFunction) {
        try {
            const employeeId = req.params.id;
            const controller = new CheckInOutsController();
            const employeeDetails = await controller.one(req, res);
            const checkInOuts = employeeDetails.employee.checkInOuts; // Ajuste aqui
            res.render("checkInOutPage", { title: "Check In/Out", employeeDetails, employeeId, checkInOuts });
        } catch (error) {
            next(error);
        }
    }
}



