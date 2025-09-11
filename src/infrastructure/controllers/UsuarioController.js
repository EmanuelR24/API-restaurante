/**
 * Controlador para manejar las operaciones HTTP relacionadas con usuarios.
 * 
 * Esta clase actúa como intermediario entre las rutas de Express y el servicio
 * de usuarios, manejando las solicitudes HTTP y devolviendo las respuestas
 * apropiadas.
 * 
 * @class UsuarioController
 * 
 * @constructor
 * @param {UsuarioService} usuarioService - Instancia del servicio de usuarios
 * que contiene la lógica de negocio.
 */
class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  crearUsuario = async (req, res) => {
    try {
      const usuario = await this.usuarioService.crearUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await this.usuarioService.obtenerUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerUsuarioPorId = async (req, res) => {
    try {
      const usuario = await this.usuarioService.obtenerUsuarioPorId(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  actualizarUsuario = async (req, res) => {
    try {
      const usuario = await this.usuarioService.actualizarUsuario(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  eliminarUsuario = async (req, res) => {
    try {
      const usuario = await this.usuarioService.eliminarUsuario(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  iniciarSesion = async (req, res) => {
    try {
      const { email, password } = req.body;
      const usuario = await this.usuarioService.iniciarSesion(email, password);
      res.json({ 
        message: 'Login exitoso', 
        usuario: {
          id: usuario._id,
          email: usuario.email,
          rol: usuario.rol
        }
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
}

module.exports = UsuarioController;