/**
 * Define el esquema y modelo de MongoDB para la gestión de clientes.
 * 
 * Este módulo utiliza Mongoose para definir la estructura de datos de los clientes,
 * incluyendo validaciones, documentos únicos y formato de WhatsApp.
 * 
 * @module models/Cliente
 * @requires mongoose
 * 
 * @typedef {Object} Cliente
 * @property {String} documento - Número de documento (requerido, único)
 * @property {String} nombreCompleto - Nombre completo del cliente (requerido)
 * @property {Date} fechaNacimiento - Fecha de nacimiento del cliente
 * @property {String} direccion - Dirección del cliente
 * @property {String} whatsapp - Número de WhatsApp (formato internacional)
 * @property {Date} fechaRegistro - Fecha de registro (por defecto: fecha actual)
 * @property {Boolean} estatus - Estado activo/inactivo del cliente (por defecto: true)
 * 
 * @example
 * const Cliente = require('./models/Cliente');
 * 
 * // Crear un nuevo cliente
 * const nuevoCliente = new Cliente({
 *   documento: "12345678",
 *   nombreCompleto: "Juan Pérez",
 *   fechaNacimiento: new Date("1990-01-15"),
 *   direccion: "Calle 123 #45-67",
 *   whatsapp: "+573001234567"
 * });
 */
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  documento: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nombreCompleto: {
    type: String,
    required: true,
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'La fecha de nacimiento no puede ser futura'
    }
  },
  direccion: {
    type: String,
    trim: true
  },
  whatsapp: {
    type: String,
    trim: true,
    match: [/^\+[1-9]\d{1,14}$/, 'Por favor ingresa un número de WhatsApp válido con formato internacional']
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  estatus: {
    type: Boolean,
    default: true
  }
});

// Índice para búsquedas por nombre
clienteSchema.index({ nombreCompleto: 'text' });

module.exports = mongoose.model('Cliente', clienteSchema);