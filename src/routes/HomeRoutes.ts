import { HomeController } from '../controller/HomeController';
import { Router } from 'express';
import { EmployeesController } from '../controller/EmployeesController';

const router = Router();
const employeesController = new EmployeesController();

export const HomeRoutes = [
    {
        method: 'get',
        route: '/',
        controller: HomeController,
        action: 'welcome'
    }
];

export function RegisterHomeRoutes(app) {
    router.get('/', (req, res, next) => employeesController.renderHome(req, res, next));
    app.use('/', router);
}