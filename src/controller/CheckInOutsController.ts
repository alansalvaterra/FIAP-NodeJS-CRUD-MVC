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

    async save(req: Request, res: Response) {
        const { checkIn, checkOut, employeeId } = req.body;

        try {
            const employee = await this.employeesRepository.findOneBy({ id: employeeId });
            if (!employee) {
                return res.status(404).send({ error: "Employee not found" });
            }

            const checkInOut = new CheckInOuts();
            checkInOut.checkIn = new Date(checkIn);
            checkInOut.checkOut = new Date(checkOut);
            checkInOut.employee = employee;

            const savedCheckInOut = await this.checkInOutsRepository.save(checkInOut);
            return res.status(201).send(savedCheckInOut);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Internal Server Error" });
        }
    }

    //TODO: CONTINUE CRUD FROM HERE

    static async renderControlReport(req: Request, res: Response, next: NextFunction) {
        try {
            const controller = new CheckInOutsController();
            const employeeId = parseInt(req.params.id);
            const checkInOuts = await controller.checkInOutsRepository.find({ where: { employee: { id: employeeId } } });
            const employeeDetails = await controller.employeesRepository.findOne({ where: { id: employeeId } });

            if (employeeDetails && checkInOuts) {
                res.render("checkInOutControlReport", { title: "Check In/Out", employeeDetails, employeeId, checkInOuts });
            } else {
                res.status(404).send('Funcionário não encontrado');
            }
        } catch (error) {
            next(error);
        }
    }

    static async renderDailyRecord(req: Request, res: Response, next: NextFunction) {
        res.render('checkInOutDailyRecord', { title: 'Registro de Ponto' });
    }
}

