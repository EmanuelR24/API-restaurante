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