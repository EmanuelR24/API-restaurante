/**
 * Configura las rutas de Express para el manejo de clientes.
 * 
 * Este módulo define los endpoints RESTful para las operaciones CRUD de clientes,
 * incluyendo búsquedas específicas por documento y nombre.
 * 
 * @module routes/clientes
 * @requires express
 * 
 * @param {ClienteController} clienteController - Instancia del controlador de clientes
 * que contiene los métodos para manejar las solicitudes HTTP.
 * 
 * @returns {Router} Router de Express configurado con las rutas de clientes.
 */
const express = require('express');
const router = express.Router();

module.exports = (clienteController) => {
  router.post('/', clienteController.crearCliente);
  router.get('/', clienteController.obtenerClientes);
  router.get('/buscar', clienteController.buscarClientesPorNombre);
  router.get('/documento/:documento', clienteController.obtenerClientePorDocumento);
  router.get('/:id', clienteController.obtenerClientePorId);
  router.put('/:id', clienteController.actualizarCliente);
  router.delete('/:id', clienteController.eliminarCliente);

  return router;
};