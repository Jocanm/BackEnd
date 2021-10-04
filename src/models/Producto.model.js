'use strict';
var models = require('../configdb/configMongo');
var ProductoModel = models.ProductoModel;

class Producto {
  constructor(Producto) {
    this._id = Producto._id ? Producto._id : undefined;
    this.descripcion = Producto.descripcion;
    this.valor = Producto.valor;
    this.estado = Producto.estado;
  }

  static create(newPro, result) {
    var data = new ProductoModel(newPro);
    data.save(function (err) {
      if (err)
        result(err, null);
      else
        result(null, data._id);
    });
  }

  static findById(id, result) {
    ProductoModel.findById(id, function (err, doc) {
      if (err)
        result(null, err);
      else
        result(null, new Producto(doc));
    });
  }

  static findAll(result) {
    ProductoModel.find().then(function (doc) {
      result(null, doc);
    });
  }

  static update(id, producto, result) {
    producto._id = id;

    ProductoModel.findOneAndUpdate({ _id: id }, producto, { upsert: true }, function (err, doc) {
      if (err)
        result(null, err);
      else {
        result(null, 'Poducto actualizado');
      }
    });
  }

  static delete(id, result) {
    ProductoModel.findByIdAndRemove(id).exec();
    result(null, 'Producto eliminado');
  }
}

module.exports = Producto;