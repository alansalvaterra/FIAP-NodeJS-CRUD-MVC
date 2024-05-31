import { EmployeeCheckInOutsController } from "../controller/EmployeeCheckInOutsController"
import { Request, Response } from "express"

export const EmployeeCheckInOutsRoutes = [{
    method: "get",
    route: "/frequency",
    controller: EmployeeCheckInOutsController,
    action: "all"
}, {
    method: "get",
    route: "/frequency/:id",
    controller: EmployeeCheckInOutsController,
    action: "one"
}, {
    method: "post",
    route: "/frequency",
    controller: EmployeeCheckInOutsController,
    action: "save"
}, {
    method: "delete",
    route: "/frequency/:id",
    controller: EmployeeCheckInOutsController,
    action: "remove"
}];

export const RegisterEmployeeCheckInOutsRoutes = (app: any) => {
    EmployeeCheckInOutsRoutes.forEach(route => {
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