/**
 * Configura las rutas de Express para el manejo de pedidos.
 * 
 * Este módulo define los endpoints RESTful para las operaciones CRUD de pedidos,
 * asociando cada verbo HTTP (POST, GET, PUT, DELETE) con el método correspondiente
 * del controlador de pedidos inyectado.
 * 
 * @module routes/pedidos
 * @requires express
 * 
 * @param {PedidoController} pedidoController - Instancia del controlador de pedidos
 * que contiene los métodos para manejar las solicitudes HTTP.
 * 
 * @returns {Router} Router de Express configurado con las rutas de pedidos.
 * 
 * @example
 * // Uso en la aplicación principal
 * const express = require('express');
 * const app = express();
 * const pedidoRoutes = require('./routes/pedidos');
 * 
 * // Inyectar el controlador en las rutas
 * app.use('/api/pedidos', pedidoRoutes(pedidoController));
 * 
 * // Endpoints disponibles:
 * // POST    /api/pedidos     - Crear un nuevo pedido
 * // GET     /api/pedidos     - Obtener todos los pedidos
 * // GET     /api/pedidos/:id - Obtener un pedido por ID
 * // PUT     /api/pedidos/:id - Actualizar un pedido existente
 * // DELETE  /api/pedidos/:id - Eliminar un pedido
 */
const express = require('express');
const router = express.Router();

module.exports = (pedidoController) => {
  router.post('/', pedidoController.crearPedido);
  router.get('/', pedidoController.obtenerPedidos);
  router.get('/:id', pedidoController.obtenerPedidoPorId);
  router.put('/:id', pedidoController.actualizarPedido);
  router.delete('/:id', pedidoController.eliminarPedido);

  return router;
};