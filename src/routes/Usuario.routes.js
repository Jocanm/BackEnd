const express = require('express')
const router = express.Router()
const UsuarioController = require('../controllers/Usuario.controller');

// Retrieve all usuario
router.get('/', UsuarioController.findAll);
// Create a new usuario
router.post('/', UsuarioController.create);
// Retrieve a single usuario with id
router.get('/:id', UsuarioController.findById);
// Update a usuario with id
router.put('/:id', UsuarioController.update);
// Delete a usuario with id
router.delete('/:id', UsuarioController.delete);

module.exports = router