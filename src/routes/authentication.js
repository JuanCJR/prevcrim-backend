const express = require("express");
const router = express.Router();
const { creaUsuario } = require("../controllers/authentication.controller");

router.route("/creausuario").post(creaUsuario); // Ruta para la creacion de usuarios

module.exports = router;
