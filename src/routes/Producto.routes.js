const express = require('express')
const router = express.Router()
const ProductoController = require('../controllers/Producto.controller');

// Retrieve all producto
router.get('/', ProductoController.findAll);
// Create a new producto
router.post('/', ProductoController.create);
// Retrieve a single producto with id
router.get('/:id', ProductoController.findById);
// Update a producto with id
router.put('/:id', ProductoController.update);
// Delete a producto with id
router.delete('/:id', ProductoController.delete);

module.exports = router