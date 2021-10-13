import {getDB} from "../db/db.js";
import { ObjectId } from 'mongodb';

export const buscarVentas = async(callback)=>{

    const conexion = getDB()
    await conexion.collection("ventas")
    .find({})
    .toArray(callback)
}

export const crearVenta = async(datos,callback) =>{

    const conexion = getDB()
    await conexion.collection("ventas").insertOne(datos,callback)
}

export const actualizarVenta = async(id,datos,callback) =>{

    const conexion = getDB()
    const filtro = {_id: new ObjectId(id)}
    const operacion = {
        $set:datos
    }

    await conexion.collection("ventas").findOneAndUpdate(filtro,operacion,{ upsert:true, returnOriginal:true },callback)
}

export const eliminarVenta = async(id,callback) =>{

    const filtro = {_id: new ObjectId(id)}

    const conexion = getDB()
    await conexion.collection("ventas").deleteOne(filtro,callback)
}
