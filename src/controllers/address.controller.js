addressCtrl = {};
const pool = require("../database/dataBase");

//Obtiene lista de regiones
addressCtrl.getRegiones = async (req, res) => {
  const data = await pool.query(`Select * from regiones order by region_ordinal asc`);
  res.json(data);
}; //

//Obtiene lista de Comunas por region especifica
addressCtrl.getComunas = async (req, res) => {
  const { codRegion } = req.body;
  const data = await pool.query(
    `Select * from comunas where cod_region = ?
  `,
    [codRegion]
  );
  res.json(data);
}; //
module.exports = addressCtrl;
