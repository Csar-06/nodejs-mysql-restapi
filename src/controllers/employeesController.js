import { response } from "express"
import { pool } from "../db.js"


const EmployeeCrud = {
    GetEmployees: async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM employee")
            if (result) {
                res.status(200).send({ msg: "Success", data: result[0] })

            }
        } catch (e) {
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        }
    },
    GetEmployee: async (req, res) => {
        // console.log(req.params); 

        try {
            const [result] = await pool.query("SELECT * FROM employee WHERE  id=?", [parseInt(req.params.id)])
            console.log(result);
            if (result.length <= 0) return res.status(404).json({ msg: "Empleado no encontrado." })

            res.status(200).send({ msg: "Success", data: result[0] })
        } catch (e) {
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        }


    },
    AddEmployee: async (req, res) => {
        const newEmployee = req.body
        try {

            await pool.query("INSERT INTO employee(name, salary) VALUES(?,?)", [newEmployee.name, newEmployee.salary])
            res.status(201).redirect('/api/employees')
        } catch (e) {
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        }
    },
    UpdateEmployee: async (req, res) => {
        // const employee = req.body;
        // await pool.query("UPDATE employee SET name = ? WHERE id = ?", [employee.newName, employee.id])
        // res.status(200).redirect('/api/employees')

        const { id } = req.params;
        const { newName, salary } = req.body;
        console.log(id, newName, salary);
        try {
            const [result] = await pool.query("UPDATE employee SET name = ?, salary = ?  WHERE id = ?", [newName, salary, id])
            console.log(result);

            if (result.affectedRows == 0) {
                res.status(404).send({ msg: 'No se pudo actualizar los datos (Empleado no encontrado)' });
            } else {
                const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id])
                res.json(rows[0])
            }
        } catch (e) {
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        }
    },
    PatchEmployee: async (req, res) => {
        const { id } = req.params;
        const { newName, salary } = req.body;
        console.log(id, newName, salary);
        try {
            const [result] = await pool.query("UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary)  WHERE id = ?", [newName, salary, id])
            console.log(result);

            if (result.affectedRows == 0) {
                res.status(404).send({ msg: 'No se pudo actualizar los datos (Empleado no encontrado)' });
            } else {
                const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id])
                res.json(rows[0])
            }
        } catch (e) {
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        }
    },
    DeleteEmployee: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM  employee WHERE id = ?', [req.params.id]);
            console.log(result);
            if (result.affectedRows <= 0) return res.status(400).json({ msg: 'Empleado no encontrado' });

            res.status(200).send({ msg: 'Empleado eliminado' });
        } catch (e) {
            return res.status(500).json({
                msg: 'Something went wrong'
            })
        }
    }
}

export default EmployeeCrud;