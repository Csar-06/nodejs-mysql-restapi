import { Router } from "express"
import {pool} from "../db.js"

const router = Router()

router.get('/ping', async (req, res)=>{
    const [resultado] = await pool.query('Select 1+1 as res ')
    res.send(resultado)
})

export default router   
