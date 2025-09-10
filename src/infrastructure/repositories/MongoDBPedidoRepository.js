const Pedido = require('../../domain/models/Pedido');
const PedidoRepository = require('../../application/use-cases/PedidoRepository');

class MongoDBPedidoRepository extends PedidoRepository {
  async crear(pedidoData) {
    const pedido = new Pedido(pedidoData);
    return await pedido.save();
  }

  async obtenerTodos() {
    return await Pedido.find().sort({ fecha: -1 });
  }

  async obtenerPorId(id) {
    return await Pedido.findById(id);
  }

  async actualizar(id, pedidoData) {
    return await Pedido.findByIdAndUpdate(id, pedidoData, { 
      new: true, 
      runValidators: true 
    });
  }

  async eliminar(id) {
    return await Pedido.findByIdAndDelete(id);
  }
}

module.exports = MongoDBPedidoRepository;