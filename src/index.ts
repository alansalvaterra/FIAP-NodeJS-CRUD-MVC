import * as express from "express"
import { AppDataSource } from "./data-source"
import { HomeRoutes } from './routes/HomeRoutes';
import { EmployeesRoutes } from "./routes/EmployeeRoutes"
import { CheckInOutsRoutes } from "./routes/CheckInOutsRoutes"
import path = require('path');
import helmet from 'helmet';
const crypto = require('crypto');


AppDataSource.initialize().then(async () => {

    const PORT = 3000;

    // Create express app
    const app = express()

    // Middleware for parsing JSON
    app.use(express.json());

    // Middleware to generate a nonce for each request
    // app.use((req, res, next) => {
    //     res.locals.nonce = crypto.randomBytes(16).toString('base64');
    //     next();
    // });

    // Middleware Helmet for CSP
    // app.use(helmet({
    //     contentSecurityPolicy: {
    //         directives: {
    //             defaultSrc: ["'self'"],
    //             scriptSrc: ["'self'"],
    //             styleSrc: ["'self'"],
    //             fontSrc: ["'self'"],
    //             scriptSrcAttr: ["'none'"], // Adicionado para inline event handlers
    //         }
    //     }
    // }));

    // Config Express to use EJS
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Serving static files in Express
    app.use(express.static('public'))

    // Register Routes
    HomeRoutes(app);
    EmployeesRoutes(app);
    CheckInOutsRoutes(app);

    // Start express server
    app.listen(PORT)

    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT} to see results`)

}).catch(error => console.log(error))
