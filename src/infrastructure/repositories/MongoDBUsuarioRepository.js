/**
 * Implementación concreta del repositorio de usuarios para MongoDB.
 * 
 * Esta clase proporciona la implementación específica de MongoDB para
 * las operaciones CRUD de usuarios. Incluye métodos adicionales para
 * búsqueda por email y verificación de credenciales.
 * 
 * @class MongoDBUsuarioRepository
 * 
 * @method crear - Crea un nuevo usuario en la base de datos MongoDB.
 * @method obtenerTodos - Obtiene todos los usuarios ordenados por fecha de creación.
 * @method obtenerPorId - Obtiene un usuario específico por su ID de MongoDB.
 * @method obtenerPorEmail - Obtiene un usuario por su email.
 * @method actualizar - Actualiza un usuario existente.
 * @method eliminar - Elimina un usuario de la base de datos por su ID.
 * @method verificarCredenciales - Verifica email y password de un usuario.
 * 
 * @example
 * const usuarioRepository = new MongoDBUsuarioRepository();
 * 
 * // Crear un nuevo usuario
 * const nuevoUsuario = await usuarioRepository.crear({
 *   email: "admin@restaurante.com",
 *   password: "password123",
 *   rol: "admin"
 * });
 */
const Usuario = require('../../domain/models/Usuario');

class MongoDBUsuarioRepository {
  async crear(usuarioData) {
    const usuario = new Usuario(usuarioData);
    return await usuario.save();
  }

  async obtenerTodos() {
    return await Usuario.find().sort({ fechaCreacion: -1 });
  }

  async obtenerPorId(id) {
    return await Usuario.findById(id);
  }

  async obtenerPorEmail(email) {
    return await Usuario.findOne({ email });
  }

  async actualizar(id, usuarioData) {
    if (usuarioData.password) {
      delete usuarioData.password; // La encriptación se maneja en el pre-save
    }
    return await Usuario.findByIdAndUpdate(id, usuarioData, { 
      new: true, 
      runValidators: true 
    });
  }

  async eliminar(id) {
    return await Usuario.findByIdAndDelete(id);
  }

  async verificarCredenciales(email, password) {
    const usuario = await this.obtenerPorEmail(email);
    if (!usuario || !usuario.estatus) return null;
    
    const esPasswordValido = await usuario.compararPassword(password);
    return esPasswordValido ? usuario : null;
  }
}

module.exports = MongoDBUsuarioRepository;