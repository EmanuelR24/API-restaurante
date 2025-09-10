require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./src/infrastructure/database/mongodb');

// Importaciones de la arquitectura
const PedidoService = require('./src/application/use-cases/PedidoService');
const MongoDBPedidoRepository = require('./src/infrastructure/repositories/MongoDBPedidoRepository');
const PedidoController = require('./src/infrastructure/controllers/PedidoController');
const pedidosRouter = require('./src/routes/pedidos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar dependencias
const pedidoRepository = new MongoDBPedidoRepository();
const pedidoService = new PedidoService(pedidoRepository);
const pedidoController = new PedidoController(pedidoService);

// Rutas
app.use('/pedidos', pedidosRouter(pedidoController));

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