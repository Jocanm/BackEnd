'use strict';
var models = require('../configdb/configMongo');
var VentasModel = models.VentasModel;

class Ventas {
  constructor(Ventas) {
    this.idV = Ventas.idV ? Ventas.idV : undefined;
    this.fechaVenta = Ventas.fechaVenta;
    this.estado = Ventas.estado;
    this.valorTotal = Ventas.valorTotal;
    this.idC = Ventas.idC;
    this.nombreCliente = Ventas.nombreCliente
  }

  static create(newVent, result) {
    var data = new VentasModel(newVent);
    data.save(function (err) {
      if (err)
        result(err, null);
      else
        result(null, data.idV);
    });
  }

  static findById(id, result) {
    VentasModel.find({$or: [{'idV':idV}, {'idC':idC}, {'nombreCliente':nombreCliente}]},
    function (err, docs){
      if(!err) result(null, docs)
    });
  }

  static findAll(result) {
    VentasModel.find().then(function (doc) {
      result(null, doc);
    });
  }

  static update(id, venta, result) {
    venta.idV = idV;

    VentasModel.findOneAndUpdate({ idV: idV }, venta, { upsert: true }, function (err, doc) {
      if (err)
        result(null, err);
      else {
        result(null, 'Venta actualizada');
      }
    });
  }

  static delete(id, result) {
    VentasModel.findByIdAndRemove(id).exec();
    result(null, 'Producto eliminado');
  }
}

module.exports = Ventas;