/**
 * Servicio para la gestión de lógica de negocio de usuarios.
 * 
 * @class UsuarioService
 * 
 * @constructor
 * @param {Object} usuarioRepository - Instancia del repositorio 
 * de usuarios que implementa los métodos CRUD
 */
class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async crearUsuario(usuarioData) {
    // Verificar si el email ya existe
    const usuarioExistente = await this.usuarioRepository.obtenerPorEmail(usuarioData.email);
    if (usuarioExistente) {
      throw new Error('El email ya está registrado');
    }

    return await this.usuarioRepository.crear(usuarioData);
  }

  async obtenerUsuarios() {
    return await this.usuarioRepository.obtenerTodos();
  }

  async obtenerUsuarioPorId(id) {
    return await this.usuarioRepository.obtenerPorId(id);
  }

  async actualizarUsuario(id, usuarioData) {
    return await this.usuarioRepository.actualizar(id, usuarioData);
  }

  async eliminarUsuario(id) {
    return await this.usuarioRepository.eliminar(id);
  }

  async iniciarSesion(email, password) {
    const usuario = await this.usuarioRepository.verificarCredenciales(email, password);
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }
    return usuario;
  }
}

module.exports = UsuarioService;