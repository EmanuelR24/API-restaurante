/**
 * Controlador para manejar las operaciones HTTP relacionadas con pedidos.
 * 
 * Esta clase actúa como intermediario entre las rutas de Express y el servicio
 * de pedidos, manejando las solicitudes HTTP y devolviendo las respuestas
 * apropiadas. Implementa los métodos para realizar operaciones CRUD sobre
 * los pedidos a través de endpoints RESTful.
 * 
 * @class PedidoController
 * 
 * @constructor
 * @param {PedidoService} pedidoService - Instancia del servicio de pedidos
 * que contiene la lógica de negocio.
 * 
 * @method crearPedido - Maneja las solicitudes POST para crear nuevos pedidos.
 * @method obtenerPedidos - Maneja las solicitudes GET para obtener todos los pedidos.
 * @method obtenerPedidoPorId - Maneja las solicitudes GET para obtener un pedido por ID.
 * @method actualizarPedido - Maneja las solicitudes PUT/PATCH para actualizar pedidos.
 * @method eliminarPedido - Maneja las solicitudes DELETE para eliminar pedidos.
 * 
 * @example
 * const pedidoService = new PedidoService(pedidoRepository);
 * const pedidoController = new PedidoController(pedidoService);
 * 
 * // En rutas de Express
 * router.post('/pedidos', pedidoController.crearPedido);
 * router.get('/pedidos', pedidoController.obtenerPedidos);
 * router.get('/pedidos/:id', pedidoController.obtenerPedidoPorId);
 * router.put('/pedidos/:id', pedidoController.actualizarPedido);
 * router.delete('/pedidos/:id', pedidoController.eliminarPedido);
 */
class PedidoController {
  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  crearPedido = async (req, res) => {
    try {
      const pedido = await this.pedidoService.crearPedido(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  obtenerPedidos = async (req, res) => {
    try {
      const pedidos = await this.pedidoService.obtenerPedidos();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerPedidoPorId = async (req, res) => {
    try {
      const pedido = await this.pedidoService.obtenerPedidoPorId(req.params.id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  actualizarPedido = async (req, res) => {
    try {
      const pedido = await this.pedidoService.actualizarPedido(req.params.id, req.body);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  eliminarPedido = async (req, res) => {
    try {
      const pedido = await this.pedidoService.eliminarPedido(req.params.id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = PedidoController;