import {getDB} from "../db/db.js";
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode'

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

export const consultarOcrearUsuario = async(req,callback)=>{
    //1. obtener los datos del usuario desde el token
    const token = req.headers.authorization.split("Bearer ")[1];
    const user = jwt_decode(token)['http://localhost/userData']
    // console.log(user)

    //2. con el correo del usuario o con el id de auth0 verificar si el usuario existe en la bd

    const conexion = getDB();
    await conexion.collection("usuarios").findOne({email: user.email},
        async (err,res)=>{
            // console.log(res)
            if(res){
                //4. si no está lo crea y devuelve la info
                callback(err,res)
            }
            else{
                //Reestructuramos el nombre:
                let nombreLista = user.name.split(" ");
                for (var i = 0; i < nombreLista.length; i++) {
                    nombreLista[i] = nombreLista[i].charAt(0).toUpperCase() + nombreLista[i].slice(1).toLowerCase();
                }
                let name = nombreLista.join(" ");
                user.name = name;
                user.auth0ID = user._id;
                delete user._id;
                user.estado = "Pendiente"
                user.rol = "Sin rol"
                //3. si ya existe devuelve la info
                await crearUsuario(user,(err,resp)=>{
                    console.log("\n-----CREANDO NUEVO USUARIO-----\n")

                    return callback(err,user)
                })
            }
        }
        )

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

