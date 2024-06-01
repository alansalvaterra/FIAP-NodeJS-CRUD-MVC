import { EmployeesController } from "../controller/EmployeesController"
import { Request, Response, NextFunction } from "express"
import { Router } from 'express';

const router = Router();

//API
export const APIEmployeesEndPoints = [{
    method: "get",
    route: "/api/employees",
    controller: EmployeesController,
    action: "all"
}, {
    method: "get",
    route: "/api/employees/:id",
    controller: EmployeesController,
    action: "one"
}, {
    method: "post",
    route: "/api/employees",
    controller: EmployeesController,
    action: "save"
}, {
    method: "delete",
    route: "/api/employees/:id",
    controller: EmployeesController,
    action: "remove"
}, {
    method: "put",
    route: "/api/employees/:id",
    controller: EmployeesController,
    action: "update"
}
];

export const EmployeesRoutes = (app: any) => {
    APIEmployeesEndPoints.forEach(route => {
        router[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                if (result !== null && result !== undefined) {
                    res.send(result);
                }
            } catch (error) {
                next(error);
            }
        });
    });
    app.use('/', router);
};

//Pages
router.get('/employees/maintence', (req: Request, res: Response, next: NextFunction) => {
    return EmployeesController.renderMaintence(req, res, next);
});

router.get('/employees/edit/:id', (req: Request, res: Response, next: NextFunction) => {
    return EmployeesController.renderEdit(req, res, next);
});

router.get('/employees/new', (req: Request, res: Response, next: NextFunction) => {
    return EmployeesController.renderNewEmployee(req, res, next);
});