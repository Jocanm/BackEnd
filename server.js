import Express from "express";
import Cors from 'cors';
import conexionBD from "./db/db.js";
import dotenv from 'dotenv';
import rutasProducto from './views/rutaProducto.js'
import rutasUsuario from './views/rutaUsuario.js'
import rutasVenta from './views/rutaVenta.js'

dotenv.config({path:"./.env"})

const app = Express()
app.use(Express.json())
app.use(Cors()) 
app.use(rutasProducto)
app.use(rutasUsuario)
app.use(rutasVenta)

const main = () =>{
    return app.listen(process.env.PORT,()=>{
        console.log(`Corriendo en el puerto ${process.env.PORT}`)
    })
}

conexionBD(main)