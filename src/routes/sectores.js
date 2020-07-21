const express = require("express");
const router = express.Router();
const {
  nuevoSector,
  getSectores,
  getComunas,
  actualizaSector,
  agregarComunas,modificarComunas,eliminarComunas
} = require("../controllers/sectores.controller");

//Funcion para eliminar comunas a un sector
router.route("/eliminarcomunas").all(eliminarComunas);

//Funcion para modificar comunas a un sector
router.route("/modificarcomunas").all(modificarComunas);

//Funcion para agregar comunas a un sector
router.route("/agregarcomunas").all(agregarComunas);

//Funcion para obtener comunas de un sector
router.route("/listacomunas").get(getComunas);
//Funcion para crear sector
router.route("/nuevo").post(nuevoSector);
//Funcion para listar sectores
router.route("/listar").get(getSectores);
//Funcion para obtener sector en especifico
router.route("/obtener").post();
//Funcion para actualizar sector
router.route("/actualizar").post(actualizaSector);
//Funcion para liminar sector
router.route("/eliminar").post();

module.exports = router;
