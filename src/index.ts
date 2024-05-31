import * as express from "express"
import { AppDataSource } from "./data-source"
import { RegisterHomeRoutes } from './routes/HomeRoutes';
import { RegisterEmployeesRoutes } from "./routes/EmployeeRoutes"
import { RegisterCheckInOutsRoutes } from "./routes/CheckInOutsRoutes"

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

    //Serving static files in Express
    app.use(express.static('public'))
    
    //Register Home Route
    RegisterHomeRoutes(app);

    //Register Routes
    RegisterEmployeesRoutes(app);
    RegisterCheckInOutsRoutes(app);

    // start express server
    app.listen(PORT)

    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT} to see results`)

}).catch(error => console.log(error))
