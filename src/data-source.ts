import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employees } from "./entity/Employees"
import { CheckInOuts } from "./entity/CheckInOuts"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Employees, CheckInOuts],
    migrations: [],
    subscribers: [],
})
