import { Router } from "express"
import EmployeeCrud from "../controllers/employeesController.js"
import bodyParser from "body-parser"
const router = Router()

router.use(bodyParser.json())

router.get('/employees', EmployeeCrud.GetEmployees)
router.get('/employees/:id', EmployeeCrud.GetEmployee)
router.post('/employees', EmployeeCrud.AddEmployee)
router.put('/employees/:id', EmployeeCrud.UpdateEmployee)
router.patch('/employees/:id', EmployeeCrud.PatchEmployee)
router.delete('/employees/:id', EmployeeCrud.DeleteEmployee)

export default router