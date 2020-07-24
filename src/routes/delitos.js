const express = require("express");
const router = express.Router();
const {
  nuevoDelito,
  getDelincuente,
  getDelitos,
  getDelincuentes,
  getDelitosPorDelincuente,
  eliminaDelincuente,
  eliminDelito,
  creaDelincuente,
} = require("../controllers/delitos.controller");

//funcion para crear un delincuente
router.route("/creadelincuente").post(creaDelincuente);

//funcion para eliminar un delito
router.route("/elimindelito").post(eliminDelito);
//funcion para eliminar un delincuente
router.route("/eliminadelincuente").post(eliminaDelincuente);

//funcion para listar delitos por delincuente
router.route("/getdelitos").get(getDelitosPorDelincuente);

//Funcion para listar delincuentes
router.route("/getdelincuentes").get(getDelincuentes);

//Funcion para crear delito
router.route("/nuevo").post(nuevoDelito);
//Funcion para listar delitos
router.route("/listar").get(getDelitos);
//Funcion para obtener delito en especifico
router.route("/obtener").post();

//Funcion para obtener delincuente en especifico
router.route("/getdelincuente").post(getDelincuente);

//Funcion para modificar delito
router.route("/modificar").post();
//Funcion para liminar delito
router.route("/eliminar").post();

module.exports = router;
