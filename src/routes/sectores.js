const express = require("express");
const router = express.Router();
const {nuevoSector,getSectores, eliminaSectores, actualizaSectores} = require("../controllers/sectores.controller");


//Funcion para crear sector
router.route("/nuevo").post(nuevoSector);
//Funcion para listar sectores
router.route("/listar").get(getSectores);
//Funcion para obtener sector en especifico
router.route("/obtener").post();
//Funcion para modificar sector
router.route("/modificar").post(actualizaSectores);
//Funcion para liminar sector
router.route("/eliminar").post(eliminaSectores);



module.exports = router;
