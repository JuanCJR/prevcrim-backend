const express = require("express");
const router = express.Router();
const {acumuladoDelitos} =require('../controllers/graficos.controller');

//Ruta para devolver acumulado de delitos por mes
router.route("/acumuladodelitos").get(acumuladoDelitos)
module.exports = router;
