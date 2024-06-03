import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { CheckInOuts } from "../entity/CheckInOuts";
import { Employees } from "../entity/Employees";

export class CheckInOutsController {

    private checkInOutsRepository = AppDataSource.getRepository(CheckInOuts);
    private employeesRepository = AppDataSource.getRepository(Employees);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.checkInOutsRepository.find();
    }

    async one(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const checkInOuts = await this.checkInOutsRepository.find({ where: { employee: { id } } });

        return checkInOuts;
    }

    //TODO: CONTINUE CRUD FROM HERE

    static async renderCheckInOutsPage(req: Request, res: Response, next: NextFunction) {
        try {
            const controller = new CheckInOutsController();
            const employeeId = parseInt(req.params.id);
            const checkInOuts = await controller.checkInOutsRepository.find({ where: { employee: { id: employeeId } } });
            const employeeDetails = await controller.employeesRepository.findOne({ where: { id: employeeId } });

            if (employeeDetails && checkInOuts) {
                res.render("checkInOutPage", { title: "Check In/Out", employeeDetails, employeeId, checkInOuts });
            } else {
                res.status(404).send('Funcionário não encontrado');
            }
        } catch (error) {
            next(error);
        }
    }
}
