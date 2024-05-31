import { EmployeeCheckInOutsController } from "../controller/EmployeeCheckInOutsController"

export const EmployeeCheckInOutsRoutes = [{
    method: "get",
    route: "/frequency",
    controller: EmployeeCheckInOutsController,
    action: "all"
}]