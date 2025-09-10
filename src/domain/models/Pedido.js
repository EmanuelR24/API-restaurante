/**
 * Define los esquemas y modelos de MongoDB para la gestión de pedidos.
 * 
 * Este módulo utiliza Mongoose para definir la estructura de datos de los pedidos,
 * incluyendo validaciones, valores por defecto y esquemas anidados para items
 * y direcciones. El modelo resultante permite realizar operaciones CRUD sobre
 * la colección de pedidos en MongoDB.
 * 
 * @module models/Pedido
 * @requires mongoose
 * 
 * @typedef {Object} Item
 * @property {String} producto - Nombre del producto (requerido)
 * @property {Number} cantidad - Cantidad del producto (requerido, mínimo 1)
 * @property {Number} precio - Precio unitario del producto (requerido, mínimo 0)
 * 
 * @typedef {Object} Direccion
 * @property {String} calle - Nombre de la calle (requerido si es domicilio)
 * @property {String} ciudad - Ciudad de entrega (requerido si es domicilio)
 * 
 * @typedef {Object} Pedido
 * @property {String} cliente - Nombre del cliente (requerido)
 * @property {String} telefono - Teléfono de contacto (requerido)
 * @property {Date} fecha - Fecha del pedido (por defecto: fecha actual)
 * @property {Item[]} items - Array de items del pedido
 * @property {Boolean} domicilio - Indica si es entrega a domicilio (por defecto: false)
 * @property {Direccion} direccion - Información de dirección para entrega
 * @property {Number} total - Monto total del pedido (requerido, mínimo 0)
 * 
 * @example
 * const Pedido = require('./models/Pedido');
 * 
 * // Crear un nuevo pedido
 * const nuevoPedido = new Pedido({
 *   cliente: "Juan Pérez",
 *   telefono: "555-1234",
 *   items: [
 *     { producto: "Pizza", cantidad: 2, precio: 250 },
 *     { producto: "Refresco", cantidad: 1, precio: 50 }
 *   ],
 *   domicilio: true,
 *   direccion: {
 *     calle: "Av. Principal 123",
 *     ciudad: "Ciudad de México"
 *   },
 *   total: 550
 * });
 */
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  }
});

const direccionSchema = new mongoose.Schema({
  calle: {
    type: String,
    required: function() {
      return this.domicilio;
    }
  },
  ciudad: {
    type: String,
    required: function() {
      return this.domicilio;
    }
  }
});

const pedidoSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  items: [itemSchema],
  domicilio: {
    type: Boolean,
    default: false
  },
  direccion: direccionSchema,
  total: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('Pedido', pedidoSchema);