import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { EmployeeCheckInOuts } from "./entity/EmployeeCheckInOuts"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Users, EmployeeCheckInOuts],
    migrations: [],
    subscribers: [],
})
