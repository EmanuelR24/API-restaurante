/**
 * Servicio para la gestión de lógica de negocio de pedidos.
 * 
 * Esta clase actúa como una capa intermedia entre los controladores
 * y el repositorio, implementando la lógica de negocio relacionada
 * con los pedidos. Utiliza el patrón de inyección de dependencias
 * para recibir el repositorio que se utilizará para las operaciones
 * de persistencia.
 * 
 * @class PedidoService
 * 
 * @constructor
 * @param {PedidoRepository} pedidoRepository - Instancia del repositorio 
 * de pedidos que se utilizará para las operaciones de base de datos.
 * 
 * @method crearPedido - Crea un nuevo pedido calculando automáticamente
 * el total basado en los items proporcionados.
 * @method obtenerPedidos - Obtiene todos los pedidos existentes.
 * @method obtenerPedidoPorId - Obtiene un pedido específico por su ID.
 * @method actualizarPedido - Actualiza un pedido existente, recalculando
 * el total si se modifican los items.
 * @method eliminarPedido - Elimina un pedido existente.
 * 
 * @example
 * const pedidoRepository = new MongoDBPedidoRepository();
 * const pedidoService = new PedidoService(pedidoRepository);
 * 
 * // Crear un nuevo pedido
 * const nuevoPedido = await pedidoService.crearPedido({
 *   items: [
 *     { cantidad: 2, precio: 10 },
 *     { cantidad: 1, precio: 20 }
 *   ]
 * });
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