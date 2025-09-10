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