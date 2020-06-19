const express = require("express");
const router = express.Router();
const {} = require("../controllers/operadores.controller");


//Funcion para crear operador
router.route("/nuevo").post();
//Funcion para listar operadores
router.route("/listar").get();
//Funcion para obtener operador en especifico
router.route("/obtener").post();
//Funcion para modificar operador
router.route("/modificar").post();
//Funcion para liminar operador
router.route("/eliminar").post();


module.exports = router;
