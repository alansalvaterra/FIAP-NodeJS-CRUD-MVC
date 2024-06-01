import * as express from "express"
import { AppDataSource } from "./data-source"
import { HomeRoutes } from './routes/HomeRoutes';
import { EmployeesRoutes } from "./routes/EmployeeRoutes"
import { CheckInOutsRoutes } from "./routes/CheckInOutsRoutes"
import path = require('path');


AppDataSource.initialize().then(async () => {

    const PORT = 3000;

    // Create express app
    const app = express()

    // Middleware for parsing JSON
    app.use(express.json());
    
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
