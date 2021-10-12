import {getDB} from "../db/db.js";
import { ObjectId } from 'mongodb';

export const buscarProductos = async(callback)=>{

    const conexion = getDB()
    await conexion.collection("productos")
    .find({})
    .toArray(callback)
}

export const crearProducto = async(datos,callback) =>{

    const conexion = getDB()
    await conexion.collection("productos").insertOne(datos,callback)
}

export const actualizarProducto = async(id,datos,callback) =>{

    const conexion = getDB()
    const filtro = {_id: new ObjectId(id)}
    const operacion = {
        $set:datos
    }

    await conexion.collection("productos").findOneAndUpdate(filtro,operacion,{ upsert:true, returnOriginal:true },callback)
}

export const eliminarProducto = async(id,callback) =>{

    const filtro = {_id: new ObjectId(id)}

    const conexion = getDB()
    await conexion.collection("productos").deleteOne(filtro,callback)
}
