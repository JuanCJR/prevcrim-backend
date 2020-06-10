const express = require("express");
const router = express.Router();
const {
  listaUsuarios,
  eliminarUsuario,
  actualizarUsuarios,
  obtieneUsuario,
} = require("../controllers/user.controller");

//Ruta para obtener informacion completa de un usuario
router.route("/obtieneusuario").post(obtieneUsuario);

//Ruta para listar usuarios
router.route("/listar").get(listaUsuarios);

//Ruta para eliminar usuarios
router.route("/eliminar").post(eliminarUsuario);

//Ruta para actualizar usuarios
router.route("/actualizar").post(actualizarUsuarios);

module.exports = router;
