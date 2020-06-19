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

module.exports = router;
