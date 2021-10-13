import Express from 'express';
import { buscarVentas, crearVenta, eliminarVenta, actualizarVenta } from '../controllers/ventaController.js';

const rutasVenta = Express.Router()

const callbackGenerico = (res) =>{
    return (error,resultado) =>{
        if(error){
            res.status(500).send("Error manipulando los datos")
        }else{
            res.json(resultado)
            // console.log(resultado)
        }
    }
}

//RUTA DE LECTURA

rutasVenta.route('/ventas').get((req,res)=>{
    buscarVentas(callbackGenerico(res))
})

//RUTA PARA CREAR VENTA
rutasVenta.route("/ventas").post((req,res)=>{
    crearVenta(req.body,callbackGenerico(res))
})

//RUTA PARA ACTUALIZAR VENTA
rutasVenta.route("/ventas/:id").patch((req,res)=>{
    actualizarVenta(req.params.id,req.body,callbackGenerico(res))
})

//RUTA PARA ELIMINAR VENTA
rutasVenta.route("/ventas/:id").delete((req,res)=>{
    eliminarVenta(req.params.id,callbackGenerico(res))
})

export default rutasVenta;