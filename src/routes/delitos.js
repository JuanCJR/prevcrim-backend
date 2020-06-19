const express = require("express");
const router = express.Router();
const {nuevoDelito,getDelincuente,getDelitos} = require("../controllers/delitos.controller");

//Funcion para crear delito
router.route("/nuevo").post(nuevoDelito);
//Funcion para listar delitos
router.route("/listar").get(getDelitos);
//Funcion para obtener delito en especifico
router.route("/obtener").post();

//Funcion para obtener delincuente en especifico
router.route("/obtenerdelincuente").post(getDelincuente);

//Funcion para modificar delito
router.route("/modificar").post();
//Funcion para liminar delito
router.route("/eliminar").post();


module.exports = router;
