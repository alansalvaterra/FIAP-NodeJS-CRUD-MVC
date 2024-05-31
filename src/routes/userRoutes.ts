import { UsersController } from "../controller/UsersController"
import { Request, Response } from "express"

export const UserRoutes = [{
    method: "get",
    route: "/users",
    controller: UsersController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UsersController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UsersController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UsersController,
    action: "remove"
}];

export const RegisterUserRoutes = (app: any) => {
    UserRoutes.forEach(route => {
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
