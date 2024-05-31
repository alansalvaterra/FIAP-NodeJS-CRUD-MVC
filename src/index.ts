import * as express from "express"
import { AppDataSource } from "./data-source"
import { RegisterHomeRoutes } from './routes/HomeRoutes';
import { RegisterUserRoutes } from "./routes/UserRoutes"
import { RegisterEmployeeCheckInOutsRoutes } from "./routes/EmployeeCheckInOutsRoutes"

const path = require('path');

AppDataSource.initialize().then(async () => {

    const PORT = 3000;

    // Create express app
    const app = express()

    // Middleware for parsing JSON
    app.use(express.json());

    //Config Express to use EJS
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Register Home Route
    RegisterHomeRoutes(app);

    //Register Routes
    RegisterUserRoutes(app);
    RegisterEmployeeCheckInOutsRoutes(app);

    // start express server
    app.listen(PORT)

    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT} to see results`)

}).catch(error => console.log(error))
