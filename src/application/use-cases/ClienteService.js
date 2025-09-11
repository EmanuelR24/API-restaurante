/**
 * Servicio para la gestión de lógica de negocio de clientes.
 * 
 * @class ClienteService
 * 
 * @constructor
 * @param {Object} clienteRepository - Instancia del repositorio 
 * de clientes que implementa los métodos CRUD
 */
class ClienteService {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async crearCliente(clienteData) {
    // Verificar si el documento ya existe
    const clienteExistente = await this.clienteRepository.obtenerPorDocumento(clienteData.documento);
    if (clienteExistente) {
      throw new Error('El documento ya está registrado');
    }

    return await this.clienteRepository.crear(clienteData);
  }

  async obtenerClientes() {
    return await this.clienteRepository.obtenerTodos();
  }

  async obtenerClientePorId(id) {
    return await this.clienteRepository.obtenerPorId(id);
  }

  async obtenerClientePorDocumento(documento) {
    return await this.clienteRepository.obtenerPorDocumento(documento);
  }

  async buscarClientesPorNombre(nombre) {
    return await this.clienteRepository.buscarPorNombre(nombre);
  }

  async actualizarCliente(id, clienteData) {
    // Si se actualiza el documento, verificar que no exista otro cliente con el mismo
    if (clienteData.documento) {
      const clienteExistente = await this.clienteRepository.obtenerPorDocumento(clienteData.documento);
      if (clienteExistente && clienteExistente._id.toString() !== id) {
        throw new Error('El documento ya está registrado en otro cliente');
      }
    }

    return await this.clienteRepository.actualizar(id, clienteData);
  }

  async eliminarCliente(id) {
    return await this.clienteRepository.eliminar(id);
  }
}

module.exports = ClienteService;