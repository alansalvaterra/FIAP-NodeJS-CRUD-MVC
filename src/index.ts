import * as express from "express"
import { AppDataSource } from "./data-source"
import { RegisterUserRoutes } from "./routes/UserRoutes"
import { RegisterEmployeeCheckInOutsRoutes } from "./routes/EmployeeCheckInOutsRoutes"
import { RegisterHomeRoutes } from './routes/HomeRoutes';

AppDataSource.initialize().then(async () => {

    const PORT = 3000;

    // create express app
    const app = express()

    // Middleware for parsing JSON
    app.use(express.json());

    //Register Home Route
    RegisterHomeRoutes(app);

    //Register Routes
    RegisterUserRoutes(app);
    RegisterEmployeeCheckInOutsRoutes(app);

    // start express server
    app.listen(PORT)

    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT} to see results`)

}).catch(error => console.log(error))
