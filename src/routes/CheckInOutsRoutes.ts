import { CheckInOutsController } from "../controller/CheckInOutsController"
import { Request, Response, NextFunction } from "express"
import { Router } from 'express';

const router = Router();

//API
export const APICheckInOutsEndPoints = [{
    method: "get",
    route: "/api/frequency",
    controller: CheckInOutsController,
    action: "all"
}, {
    method: "get",
    route: "/api/frequency/:id",
    controller: CheckInOutsController,
    action: "one"
}, {
    method: "post",
    route: "/api/frequency",
    controller: CheckInOutsController,
    action: "save"
}, {
    method: "delete",
    route: "/api/frequency/:id",
    controller: CheckInOutsController,
    action: "remove"
}, {
    method: "put",
    route: "/api/frequency/:id",
    controller: CheckInOutsController,
    action: "update"
}];

export const CheckInOutsRoutes = (app: any) => {
    APICheckInOutsEndPoints.forEach(route => {
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
router.get('/timemanagement/:id', (req: Request, res: Response, next: NextFunction) => {
    return CheckInOutsController.renderControlReport(req, res, next);
});

router.get('/dailyrecord', (req: Request, res: Response, next: NextFunction) => {
    return CheckInOutsController.renderDailyRecord(req, res, next);
});



