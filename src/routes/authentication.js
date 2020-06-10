const express = require("express");
const router = express.Router();
const {
  creaUsuario,
  Login,
  reconectUser,
} = require("../controllers/authentication.controller");

router.route("/creausuario").post(creaUsuario); // Ruta para la creacion de usuarios
router.route("/iniciasesion").post(Login); //Ruta para el inicio de sesion
router.route("/reconect").post(reconectUser); //ruta para reconectar usuario
//Ruta para listar usuarios
// router.route("/listar").get(listaUsuarios);

// //Ruta para eliminar usuarios
// router.route("/eliminar").post(eliminarUsuarios);

// //Ruta para actualizar usuarios
// router.route("/actualizar").post(actualizarUsuarios);

module.exports = router;
