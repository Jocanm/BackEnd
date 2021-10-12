import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})

const stringConexion = process.env.DATABASE_URL;

const cliente = new MongoClient(stringConexion,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

let conexion;

const conexionBD = (callback)=>{

    cliente.connect((error,db)=>{
        if(error){
            console.error("Error en la conexion a la db")
            return "Error"
        }
        conexion = db.db("ventasV2")
        console.log("Conexión exitosa")
        return callback();
        
    })
}

const getDB = () => {
    return conexion;
}

export default conexionBD;
export {getDB}