import { Request, Response } from 'express';
import { HomeController } from '../controller/HomeController';

export const HomeRoutes = [
    {
        method: 'get',
        route: '/',
        controller: HomeController,
        action: 'welcome'
    }
];

export const RegisterHomeRoutes = (app: any) => {
    HomeRoutes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                if (result !== null && result !== undefined) {
                    res.json(result);
                }
            } catch (error) {
                next(error);
            }
        });
    });
};