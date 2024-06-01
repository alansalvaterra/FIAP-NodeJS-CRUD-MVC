import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Employees } from "../entity/Employees"

export class EmployeesController {

    private employeeRepository = AppDataSource.getRepository(Employees)

    async all(req: Request, res: Response) {
        return this.employeeRepository.find()
    }

    async one(request: Request, response: Response) {
        const id = parseInt(request.params.id)

        if (isNaN(id)) {
            response.status(400).send({ error: "Invalid employee ID" });
            return;
        }

        const employee = await this.employeeRepository.findOne({
            where: { id }
        })

        if (!employee) {
            return "unregistered employee"
        }
        return employee
    }

    async save(request: Request, response: Response) {
        const { name, email, role } = request.body;

        const employee = Object.assign(new Employees(), {
            name,
            email,
            role
        })

        return this.employeeRepository.save(employee)
    }

    async remove(request: Request, response: Response) {
        const id = parseInt(request.params.id)

        let employeeToRemove = await this.employeeRepository.findOneBy({ id })

        if (!employeeToRemove) {
            return "this employee not exist"
        }

        await this.employeeRepository.remove(employeeToRemove)

        return "employee has been removed"
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let employeeToUpdate = await this.employeeRepository.findOneBy({ id })

        if (!employeeToUpdate) {
            return "this employee not exist"
        }

        await this.employeeRepository.update(employeeToUpdate, request.body)

        return "employee has been updated"
    }

    async renderHome(req: Request, res: Response, next: NextFunction) {
        const employees = await this.employeeRepository.find();
        res.render('index', { title: 'SIGHT', employees: employees });
    }

    static async renderMaintence(req: Request, res: Response, next: NextFunction) {
        const employeeRepository = AppDataSource.getRepository(Employees);
        const employees = await employeeRepository.find();
        res.render('employeeMaintencePage', { title: 'Manutenção', employees });
    }

    static async renderEdit(req: Request, res: Response, next: NextFunction) {
        const employeeRepository = AppDataSource.getRepository(Employees);
        const employeeId = req.params.id;

        const controller = new EmployeesController();
        const employeeDetails = await controller.one(req, res);

        res.render('employeeEdit', { title: 'Editar Funcionário', employee: employeeDetails });
    }

    static async renderNewEmployee(req: Request, res: Response, next: NextFunction) {
        res.render('employeeNew', { title: 'Novo Funcionário' });
    }
}