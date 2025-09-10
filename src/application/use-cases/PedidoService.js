/**
 * Servicio para la gestión de lógica de negocio de pedidos.
 * 
 * @class PedidoService
 * 
 * @constructor
 * @param {Object} pedidoRepository - Instancia del repositorio 
 * de pedidos que implementa los métodos CRUD
 */
class PedidoService {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async crearPedido(pedidoData) {
    // Calcular el total automáticamente
    pedidoData.total = pedidoData.items.reduce((total, item) => {
      return total + (item.cantidad * item.precio);
    }, 0);

    return await this.pedidoRepository.crear(pedidoData);
  }

  async obtenerPedidos() {
    return await this.pedidoRepository.obtenerTodos();
  }

  async obtenerPedidoPorId(id) {
    return await this.pedidoRepository.obtenerPorId(id);
  }

  async actualizarPedido(id, pedidoData) {
    // Recalcular el total si hay items
    if (pedidoData.items) {
      pedidoData.total = pedidoData.items.reduce((total, item) => {
        return total + (item.cantidad * item.precio);
      }, 0);
    }

    return await this.pedidoRepository.actualizar(id, pedidoData);
  }

  async eliminarPedido(id) {
    return await this.pedidoRepository.eliminar(id);
  }
}

module.exports = PedidoService;