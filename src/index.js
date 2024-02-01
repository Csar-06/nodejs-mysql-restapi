import express  from "express";
import employeeRoutes from "./routes/employees.routes.js"

import {PORT} from './config.js'
 

const app = express()

app.use('/api', employeeRoutes)

app.use((req, res, next)=>{
    res.status(404).json(
        {
            msg: 'Error 404 Not Found'
        }
    )
})

app.listen(PORT, (req,res)=> console.log("Corrinedo en el puerto ", PORT))