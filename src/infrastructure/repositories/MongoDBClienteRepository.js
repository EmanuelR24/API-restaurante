/**
 * Implementación concreta del repositorio de clientes para MongoDB.
 * 
 * Esta clase proporciona la implementación específica de MongoDB para
 * las operaciones CRUD de clientes. Incluye métodos adicionales para
 * búsqueda por documento y búsqueda textual por nombre.
 * 
 * @class MongoDBClienteRepository
 * 
 * @method crear - Crea un nuevo cliente en la base de datos MongoDB.
 * @method obtenerTodos - Obtiene todos los clientes ordenados por fecha de registro.
 * @method obtenerPorId - Obtiene un cliente específico por su ID de MongoDB.
 * @method obtenerPorDocumento - Obtiene un cliente por su número de documento.
 * @method buscarPorNombre - Busca clientes por nombre usando texto indexado.
 * @method actualizar - Actualiza un cliente existente.
 * @method eliminar - Elimina un cliente de la base de datos por su ID.
 * 
 * @example
 * const clienteRepository = new MongoDBClienteRepository();
 * 
 * // Crear un nuevo cliente
 * const nuevoCliente = await clienteRepository.crear({
 *   documento: "12345678",
 *   nombreCompleto: "Juan Pérez",
 *   whatsapp: "+573001234567"
 * });
 */
const Cliente = require('../../domain/models/Cliente');

class MongoDBClienteRepository {
  async crear(clienteData) {
    const cliente = new Cliente(clienteData);
    return await cliente.save();
  }

  async obtenerTodos() {
    return await Cliente.find().sort({ fechaRegistro: -1 });
  }

  async obtenerPorId(id) {
    return await Cliente.findById(id);
  }

  async obtenerPorDocumento(documento) {
    return await Cliente.findOne({ documento });
  }

  async buscarPorNombre(nombre) {
    return await Cliente.find({
      $text: { $search: nombre }
    }).sort({ score: { $meta: "textScore" } });
  }

  async actualizar(id, clienteData) {
    return await Cliente.findByIdAndUpdate(id, clienteData, { 
      new: true, 
      runValidators: true 
    });
  }

  async eliminar(id) {
    return await Cliente.findByIdAndDelete(id);
  }
}

module.exports = MongoDBClienteRepository;