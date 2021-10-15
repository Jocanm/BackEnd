import Express from 'express';
import { buscarUsuarios, crearUsuario, eliminarUsuario, actualizarUsuario } from '../controllers/usuarioController.js';

const rutasUsuario = Express.Router()

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

rutasUsuario.route('/usuarios').get((req,res)=>{
    buscarUsuarios(callbackGenerico(res))
})

//RUTA PARA CREAR VENTA
rutasUsuario.route("/usuarios").post((req,res)=>{
    crearUsuario(req.body,callbackGenerico(res))
})

//RUTA PARA ACTUALIZAR VENTA
rutasUsuario.route("/usuarios/:id").patch((req,res)=>{
    actualizarUsuario(req.params.id,req.body,callbackGenerico(res))
})

//RUTA PARA ELIMINAR VENTA
rutasUsuario.route("/usuarios/:id").delete((req,res)=>{
    eliminarUsuario(req.params.id,callbackGenerico(res))
})

export default rutasUsuario;