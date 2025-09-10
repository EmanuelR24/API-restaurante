/**
 * Implementación concreta del repositorio de pedidos para MongoDB.
 * 
 * Esta clase proporciona la implementación específica de MongoDB para
 * las operaciones CRUD definidas en la interfaz PedidoRepository.
 * Utiliza el modelo Mongoose de Pedido para interactuar con la base de datos.
 * 
 * @class MongoDBPedidoRepository
 * @extends PedidoRepository
 * 
 * @method crear - Crea un nuevo pedido en la base de datos MongoDB.
 * @method obtenerTodos - Obtiene todos los pedidos ordenados por fecha descendente.
 * @method obtenerPorId - Obtiene un pedido específico por su ID de MongoDB.
 * @method actualizar - Actualiza un pedido existente con validación de datos.
 * @method eliminar - Elimina un pedido de la base de datos por su ID.
 * 
 * @example
 * const pedidoRepository = new MongoDBPedidoRepository();
 * 
 * // Crear un nuevo pedido
 * const nuevoPedido = await pedidoRepository.crear({
 *   cliente: "Juan Pérez",
 *   telefono: "555-1234",
 *   items: [...],
 *   total: 100
 * });
 * 
 * // Obtener todos los pedidos
 * const pedidos = await pedidoRepository.obtenerTodos();
 */
const Pedido = require('../../domain/models/Pedido');

class MongoDBPedidoRepository{
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