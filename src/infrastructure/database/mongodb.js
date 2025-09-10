/**
 * Establece la conexión con la base de datos MongoDB.
 * 
 * Esta función utiliza Mongoose como ODM (Object Data Modeling)
 * para conectar la aplicación a MongoDB. Se ejecuta de manera asíncrona
 * y maneja tanto la conexión exitosa como los posibles errores.
 * 
 * Las opciones de configuración aseguran que se usen los controladores
 * más modernos y estables:
 * - `useNewUrlParser`: Usa el nuevo parser de URL de conexión.
 * - `useUnifiedTopology`: Utiliza el nuevo motor de gestión de conexiones.
 * 
 * @async
 * @function conectarDB
 * @returns {Promise<void>} Una promesa que se resuelve cuando la
 * conexión se establece correctamente. Si falla, el proceso se finaliza.
 * 
 * @throws {Error} Si la conexión a MongoDB falla, se muestra el error
 * y se finaliza el proceso con código de salida 1.
 * 
 * @example
 * // Uso en la aplicación principal
 * require('dotenv').config();
 * const conectarDB = require('./config/database');
 * 
 * // Iniciar la conexión a MongoDB
 * conectarDB();
 */
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;