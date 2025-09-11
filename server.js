/**
 * Punto de entrada principal de la aplicación API de Pedidos de Restaurante.
 * 
 * Este módulo configura e inicia el servidor Express, establece la conexión
 * con la base de datos MongoDB, y configura todas las dependencias y rutas
 * de la aplicación utilizando una arquitectura en capas.
 * 
 * @module app
 * @requires dotenv
 * @requires express
 * @requires cors
 * 
 * La aplicación sigue una arquitectura en capas:
 * 1. Infraestructura: Conexión a BD, controladores, rutas
 * 2. Aplicación: Servicios y casos de uso
 * 3. Dominio: Modelos y repositorios abstractos
 * 
 * @function iniciarServidor - Función asíncrona que inicia la conexión a la BD
 * y el servidor Express.
 * 
 * @example
 * // Para iniciar la aplicación:
 * // npm start
 * 
 * // Endpoints disponibles:
 * // GET  /          - Health check de la API
 * // POST /pedidos   - Crear nuevo pedido
 * // GET  /pedidos   - Obtener todos los pedidos
 * // GET  /pedidos/:id - Obtener pedido por ID
 * // PUT  /pedidos/:id - Actualizar pedido
 * // DELETE /pedidos/:id - Eliminar pedido
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./src/infrastructure/database/mongodb');

// Importaciones de la arquitectura
const PedidoService = require('./src/application/use-cases/PedidoService');
const MongoDBPedidoRepository = require('./src/infrastructure/repositories/MongoDBPedidoRepository');
const PedidoController = require('./src/infrastructure/controllers/PedidoController');
const pedidosRouter = require('./src/routes/pedidos');

const UsuarioService = require('./src/application/use-cases/UsuarioService');
const MongoDBUsuarioRepository = require('./src/infrastructure/repositories/MongoDBUsuarioRepository');
const UsuarioController = require('./src/infrastructure/controllers/UsuarioController');
const usuariosRouter = require('./src/routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar dependencias
const pedidoRepository = new MongoDBPedidoRepository();
const pedidoService = new PedidoService(pedidoRepository);
const pedidoController = new PedidoController(pedidoService);

const usuarioRepository = new MongoDBUsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

// Rutas
app.use('/pedidos', pedidosRouter(pedidoController));
app.use('/usuarios', usuariosRouter(usuarioController));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Pedidos de Restaurante funcionando' });
});

// Iniciar servidor
const iniciarServidor = async () => {
  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
  }
};

iniciarServidor();