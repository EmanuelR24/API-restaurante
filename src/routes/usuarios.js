/**
 * Configura las rutas de Express para el manejo de usuarios.
 * 
 * Este módulo define los endpoints RESTful para las operaciones CRUD de usuarios,
 * incluyendo autenticación.
 * 
 * @module routes/usuarios
 * @requires express
 * 
 * @param {UsuarioController} usuarioController - Instancia del controlador de usuarios
 * que contiene los métodos para manejar las solicitudes HTTP.
 * 
 * @returns {Router} Router de Express configurado con las rutas de usuarios.
 */
const express = require('express');
const router = express.Router();

module.exports = (usuarioController) => {
  router.post('/', usuarioController.crearUsuario);
  router.post('/login', usuarioController.iniciarSesion);
  router.get('/', usuarioController.obtenerUsuarios);
  router.get('/:id', usuarioController.obtenerUsuarioPorId);
  router.put('/:id', usuarioController.actualizarUsuario);
  router.delete('/:id', usuarioController.eliminarUsuario);

  return router;
};