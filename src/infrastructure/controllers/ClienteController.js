/**
 * Controlador para manejar las operaciones HTTP relacionadas con clientes.
 * 
 * Esta clase actúa como intermediario entre las rutas de Express y el servicio
 * de clientes, manejando las solicitudes HTTP y devolviendo las respuestas
 * apropiadas.
 * 
 * @class ClienteController
 * 
 * @constructor
 * @param {ClienteService} clienteService - Instancia del servicio de clientes
 * que contiene la lógica de negocio.
 */
class ClienteController {
  constructor(clienteService) {
    this.clienteService = clienteService;
  }

  crearCliente = async (req, res) => {
    try {
      const cliente = await this.clienteService.crearCliente(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  obtenerClientes = async (req, res) => {
    try {
      const clientes = await this.clienteService.obtenerClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerClientePorId = async (req, res) => {
    try {
      const cliente = await this.clienteService.obtenerClientePorId(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerClientePorDocumento = async (req, res) => {
    try {
      const cliente = await this.clienteService.obtenerClientePorDocumento(req.params.documento);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  buscarClientesPorNombre = async (req, res) => {
    try {
      const { nombre } = req.query;
      if (!nombre) {
        return res.status(400).json({ error: 'Parámetro nombre es requerido' });
      }
      const clientes = await this.clienteService.buscarClientesPorNombre(nombre);
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  actualizarCliente = async (req, res) => {
    try {
      const cliente = await this.clienteService.actualizarCliente(req.params.id, req.body);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  eliminarCliente = async (req, res) => {
    try {
      const cliente = await this.clienteService.eliminarCliente(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ClienteController;