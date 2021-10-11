const express = require('express')
const router = express.Router()
const VentasController = require('../controllers/Ventas.controller');

// Retrieve all ventas
router.get('/', VentasController.findAll);
// Create a new venta
router.post('/', VentasController.create);
// Retrieve a single venta with id
router.get('/:id', VentasController.findById);
// Update a venta with id
router.put('/:id', VentasController.update);
// Delete a venta with id
router.delete('/:id', VentasController.delete);

module.exports = router