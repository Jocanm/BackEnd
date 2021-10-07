'use strict';
var models = require('../configdb/configMongo');
var UsuarioModel = models.UsuarioModel;

class Usuario {
  constructor(Usuario) {
    this._id= Usuario._id ? Usuario._id : undefined;
    this.nombre= Usuario.nombre;
    this.estado = Usuario.estado;
    this.rol= Usuario.rol;
    this.email= Usuario.email;
  }

  static create(newUser, result) {
    var data = new UsuarioModel(newUser);
    data.save(function (err) {
      if (err)
        result(err, null);
      else
        result(null, data._id);
    });
  }

  static findById(id, result) {
    UsuarioModel.findById(id, function (err, doc) {
      if (err)
        result(null, err);
      else
        result(null, new Usuario(doc));
    });
  }

  static findAll(result) {
    UsuarioModel.find().then(function (doc) {
      result(null, doc);
    });
  }

  static update(id, usuario, result) {
    usuario._id = id;

    UsuarioModel.findOneAndUpdate({ _id: id }, usuario, { upsert: true }, function (err, doc) {
      if (err)
        result(null, err);
      else {
        result(null, 'Usuario actualizado');
      }
    });
  }

  static delete(id, result) {
    UsuarioModel.findByIdAndRemove(id).exec();
    result(null, 'Usuario eliminado');
  }
}

module.exports = Usuario;