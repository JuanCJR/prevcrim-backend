const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { creaUsuario, eliminarUsuarios} = require("../controllers/authentication.controller");
=======
const { creaUsuario,listaUsuarios} = require("../controllers/authentication.controller");
>>>>>>> 387457cce209b738074b157d7f60d0c96e41defd


router.route("/creausuario").post(creaUsuario); // Ruta para la creacion de usuarios

//Ruta para listar usuarios
router.route("/listar").get(listaUsuarios);

//Ruta para eliminar usuarios
router.route("/eliminar").post(eliminarUsuarios);

module.exports = router;
