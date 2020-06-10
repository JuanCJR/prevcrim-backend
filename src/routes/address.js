const express = require("express");
const router = express.Router();
const {
  getRegiones,
  getComunas,
} = require("../controllers/address.controller");

router.route("/getregiones").get(getRegiones); //optiene todas las regiones
router.route("/getcomunas").post(getComunas);

module.exports = router;
