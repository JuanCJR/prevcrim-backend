const express = require("express");
const router = express.Router();
const { creaUsuario, eliminarUsuarios,listaUsuarios, actualizarUsuarios} = require("../controllers/authentication.controller");


router.route("/creausuario").post(creaUsuario); // Ruta para la creacion de usuarios

//Ruta para listar usuarios
router.route("/listar").get(listaUsuarios);

//Ruta para eliminar usuarios
router.route("/eliminar").post(eliminarUsuarios);

//Ruta para actualizar usuarios
router.route("/actualizar").post(actualizarUsuarios);

module.exports = router;
