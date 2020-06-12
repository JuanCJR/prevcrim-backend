const express = require("express");
const router = express.Router();
const {
  creaInstitucion,
  getInstituciones,
  eliminaInstitucion,
  actualizarInstitucion,
} = require("../controllers/instituciones.controller");

router.route("/creainstitucion").post(creaInstitucion); // ruta para crear instituciones
router.route("/listainstituciones").get(getInstituciones); // Lista instituciones
router.route("/eliminainstitucion").post(eliminaInstitucion);//elimina instituciones
router.route("/actualizainstitucion").post(actualizarInstitucion);//actualiza institucion

module.exports = router;
