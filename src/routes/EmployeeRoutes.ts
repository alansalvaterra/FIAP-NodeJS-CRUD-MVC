import { EmployeesController } from "../controller/EmployeesController"
import { Request, Response } from "express"

export const EmployeesRoutes = [{
    method: "get",
    route: "/employees",
    controller: EmployeesController,
    action: "all"
}, {
    method: "get",
    route: "/employees/:id",
    controller: EmployeesController,
    action: "one"
}, {
    method: "post",
    route: "/employees",
    controller: EmployeesController,
    action: "save"
}, {
    method: "delete",
    route: "/employees/:id",
    controller: EmployeesController,
    action: "remove"
}];

export const RegisterEmployeesRoutes = (app: any) => {
    EmployeesRoutes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
}
