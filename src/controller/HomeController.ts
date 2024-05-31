import { Request, Response, NextFunction } from 'express';

export class HomeController {
    async welcome(req: Request, res: Response, next: NextFunction) {
        res.send(`Teste rota principal`);
    }
}