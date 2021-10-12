import Express from "express";
import Cors from 'cors';
import conexionBD from "./db/db.js";
import dotenv from 'dotenv';

dotenv.config({path:"./.env"})

const app = Express()
app.use(Express.json())
app.use(Cors()) 


const main = () =>{
    return app.listen(process.env.PORT,()=>{
        console.log(`Corriendo en el puerto ${process.env.PORT}`)
    })
}

conexionBD(main)