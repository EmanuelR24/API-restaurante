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