import Express from 'express';
import { buscarProductos, crearProducto, eliminarProducto, actualizarProducto } from '../controllers/productoController.js';

const rutasProducto = Express.Router()

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

rutasProducto.route('/productos').get((req,res)=>{
    buscarProductos(callbackGenerico(res))
})

//RUTA PARA CREAR PRODUCTO
rutasProducto.route("/productos").post((req,res)=>{
    crearProducto(req.body,callbackGenerico(res))
})

//RUTA PARA ACTUALIZAR PRODUCTO
rutasProducto.route("/productos/:id").patch((req,res)=>{
    actualizarProducto(req.params.id,req.body,callbackGenerico(res))
})

//RUTA PARA ELIMINAR PRODUCTO
rutasProducto.route("/productos/:id").delete((req,res)=>{
    eliminarProducto(req.params.id,callbackGenerico(res))
})

export default rutasProducto;