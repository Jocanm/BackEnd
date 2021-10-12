import Express from 'express';
import { buscarVentas, crearVenta } from '../controllers/productoController.js';

const rutasVenta = Express.Router()

const callbackGenerico = (res) =>{
    return (error,resultado) =>{
        if(error){
            res.status(500).send("Error manipulando los datos")
        }else{
            res.json(resultado)
            console.log(resultado)
        }
    }
}

//RUTA DE LECTURA

rutasVenta.route('/productos').get((req,res)=>{
    buscarVentas(callbackGenerico(res))
})

//RUTA PARA CREAR PRODUCTO
rutasVenta.route("/productos").post((req,res)=>{
    crearVenta(req.body,callbackGenerico(res))
})

export default rutasVenta;