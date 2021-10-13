import {getDB} from "../db/db.js";
import { ObjectId } from 'mongodb';

export const buscarUsuarios = async(callback)=>{

    const conexion = getDB()
    await conexion.collection("usuarios")
    .find({})
    .toArray(callback)
}

export const crearUsuario = async(datos,callback) =>{

    const conexion = getDB()
    await conexion.collection("usuarios").insertOne(datos,callback)
}

export const actualizarUsuario = async(id,datos,callback) =>{

    const conexion = getDB()
    const filtro = {_id: new ObjectId(id)}
    const operacion = {
        $set:datos
    }

    await conexion.collection("usuarios").findOneAndUpdate(filtro,operacion,{ upsert:true, returnOriginal:true },callback)
}

export const eliminarUsuario = async(id,callback) =>{

    const filtro = {_id: new ObjectId(id)}

    const conexion = getDB()
    await conexion.collection("usuarios").deleteOne(filtro,callback)
}
