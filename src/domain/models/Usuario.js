/**
 * Define el esquema y modelo de MongoDB para la gestión de usuarios.
 * 
 * Este módulo utiliza Mongoose para definir la estructura de datos de los usuarios,
 * incluyendo validaciones, encriptación de contraseñas y roles predefinidos.
 * 
 * @module models/Usuario
 * @requires mongoose
 * @requires bcryptjs
 * 
 * @typedef {Object} Usuario
 * @property {String} email - Email del usuario (requerido, único)
 * @property {String} password - Contraseña encriptada (requerido)
 * @property {String} rol - Rol del usuario [admin, asesor] (requerido)
 * @property {Boolean} estatus - Estado activo/inactivo del usuario (por defecto: true)
 * @property {Date} fechaCreacion - Fecha de creación (por defecto: fecha actual)
 * 
 * @example
 * const Usuario = require('./models/Usuario');
 * 
 * // Crear un nuevo usuario
 * const nuevoUsuario = new Usuario({
 *   email: "admin@restaurante.com",
 *   password: "password123",
 *   rol: "admin",
 *   estatus: true
 * });
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    required: true,
    enum: ['admin', 'asesor'],
    default: 'asesor'
  },
  estatus: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Encriptar password antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar passwords
usuarioSchema.methods.compararPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);