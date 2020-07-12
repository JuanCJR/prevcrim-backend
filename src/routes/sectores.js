const express = require("express");
const router = express.Router();
const {
  nuevoSector,
  getSectores,
  getComunas,
} = require("../controllers/sectores.controller");

//Funcion para obtener comunas de un sector
router.route("/listacomunas").get(getComunas);
//Funcion para crear sector
router.route("/nuevo").post(nuevoSector);
//Funcion para listar sectores
router.route("/listar").get(getSectores);
//Funcion para obtener sector en especifico
router.route("/obtener").post();
//Funcion para modificar sector
router.route("/modificar").post();
//Funcion para liminar sector
router.route("/eliminar").post();

module.exports = router;
