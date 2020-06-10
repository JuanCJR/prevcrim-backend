const express = require("express");
const router = express.Router();
const {
  creaInstitucion,
  getInstituciones,
} = require("../controllers/instituciones.controller");

router.route("/creainstitucion").post(creaInstitucion); // ruta para crear instituciones
router.route("/listainstituciones").get(getInstituciones); // Lista instituciones

module.exports = router;
