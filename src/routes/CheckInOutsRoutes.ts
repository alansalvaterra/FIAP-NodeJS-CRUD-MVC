import { CheckInOutsController } from "../controller/CheckInOutsController"
import { Request, Response } from "express"

export const CheckInOutsRoutes = [{
    method: "get",
    route: "/frequency",
    controller: CheckInOutsController,
    action: "all"
}, {
    method: "get",
    route: "/frequency/:id",
    controller: CheckInOutsController,
    action: "one"
}, {
    method: "post",
    route: "/frequency",
    controller: CheckInOutsController,
    action: "save"
}, {
    method: "delete",
    route: "/frequency/:id",
    controller: CheckInOutsController,
    action: "remove"
}];

export const RegisterCheckInOutsRoutes = (app: any) => {
    CheckInOutsRoutes.forEach(route => {
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