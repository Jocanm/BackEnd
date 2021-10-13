'use strict';
const Venta = require('../models/Ventas.model');

exports.findAll = function (req, res) {
  Venta.findAll(function (err, venta) {
    if (err)
      res.send(err);
    //console.log('res', ventas);
    res.send(venta);
  });
};

exports.create = function (req, res) {

  const new_venta = new Venta(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Venta.create(new_venta, function (err, venta) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Venta agregada correctamente!", data: venta});
    });
  }
};

exports.findById = function (req, res) {
  Venta.findById(req.params.id, function (err, venta) {
    if (err)
      res.send(err);
    res.json(venta);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Venta.update(req.params.id, new Venta(req.body), function (err, venta) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Venta actualizada correctamente' });
    });
  }
};

exports.delete = function (req, res) {
  Venta.delete(req.params.id, function (err, venta) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Venta eliminada correctamente' });
  });
};
