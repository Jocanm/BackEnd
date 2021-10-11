var mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({path:'./.env'})

const mongoAtlasUri = process.env.DATABASE_URL;
try {
    //Conectandonos al cluster de mongo
    mongoose.connect(
        mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

var Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    _id: String,
    descripcion: String,
    valor: Number,
    estado: String
}, { collection: 'producto' });

const UsuarioSchema = new Schema({
    _id: String,
    nombre: String,
    estado: String,
    rol: String,
    email: String
}, { collection: 'usuario' });

var ProductoModel = mongoose.model('producto', ProductoSchema);
var UsuarioModel = mongoose.model('usuario', UsuarioSchema);

//esquema y modelo userdata
const UserDataSchema = new Schema({
    first_name: String,
    last_name: String
}, { collection: 'user-data' });

var UserDataModel = mongoose.model('user-data', UserDataSchema);

module.exports = {
    ProductoModel,
    UserDataModel,
    UsuarioModel
};