import Express from 'express';
import { buscarUsuarios, crearUsuario } from '../controllers/productoController.js';

const rutasUsuario = Express.Router()

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

rutasUsuario.route('/productos').get((req,res)=>{
    buscarUsuarios(callbackGenerico(res))
})

//RUTA PARA CREAR PRODUCTO
rutasUsuario.route("/productos").post((req,res)=>{
    crearUsuario(req.body,callbackGenerico(res))
})

export default rutasUsuario;