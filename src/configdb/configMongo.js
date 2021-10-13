var mongoose = require('mongoose');

const mongoAtlasUri = "mongodb+srv://adriana:adriana123@mintic.x1eaf.mongodb.net/ventas?retryWrites=true&w=majority"
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

const VentasSchema = new Schema({
    _id: String,
    fechaVenta: String,
    estado: String,
    valorTotal: Number,
    idC: String,
    nombreCliente: String,
    encargado: String,
    productos: Array
}, { collection: 'crearVenta' });

var UsuarioModel = mongoose.model('usuario', UsuarioSchema);
var ProductoModel = mongoose.model('producto', ProductoSchema);
var VentasModel = mongoose.model('crearVenta', VentasSchema);

//esquema y modelo userdata
const UserDataSchema = new Schema({
    first_name: String,
    last_name: String
}, { collection: 'user-data' });

var UserDataModel = mongoose.model('user-data', UserDataSchema);

module.exports = {
    ProductoModel,
    UserDataModel,
    UsuarioModel,
    VentasModel
};