/**
 * Repositorio abstracto para la gestión de pedidos.
 * 
 * Esta clase define la interfaz que deben implementar todos los repositorios
 * de pedidos. Proporciona métodos CRUD (Crear, Leer, Actualizar, Eliminar)
 * para la gestión de entidades de pedidos en el sistema.
 * 
 * @class PedidoRepository
 * @abstract
 * 
 * @method crear - Crea un nuevo pedido en el sistema.
 * @method obtenerTodos - Obtiene todos los pedidos registrados.
 * @method obtenerPorId - Obtiene un pedido específico por su identificador.
 * @method actualizar - Actualiza la información de un pedido existente.
 * @method eliminar - Elimina un pedido del sistema.
 * 
 * @throws {Error} Todos los métodos lanzan un error indicando que no están implementados.
 *                 Las clases concretas deben sobrescribir estos métodos.
 * 
 * @example
 * class MongoDBPedidoRepository extends PedidoRepository {
 *   async crear(pedidoData) {
 *     // Implementación específica para MongoDB
 *   }
 * }
 */
class PedidoRepository {
  async crear(pedidoData) {
    throw new Error('Método no implementado');
  }

  async obtenerTodos() {
    throw new Error('Método no implementado');
  }

  async obtenerPorId(id) {
    throw new Error('Método no implementado');
  }

  async actualizar(id, pedidoData) {
    throw new Error('Método no implementado');
  }

  async eliminar(id) {
    throw new Error('Método no implementado');
  }
}

module.exports = PedidoRepository;