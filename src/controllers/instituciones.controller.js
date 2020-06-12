institucionesCtrl = {};
const pool = require("../database/dataBase");

//Crea Institucion
institucionesCtrl.creaInstitucion = async (req, res) => {
  const { institucionInfo } = req.body;

  const institucion = await pool.query(`INSERT INTO instituciones SET ? `, {
    nombre_institucion: institucionInfo.nombreInstitucion,
    sectores: 0,
    modificado_por: institucionInfo.creadoPor,
  });

  res.json(institucion);
}; //

//Lista Instituciones
institucionesCtrl.getInstituciones = async (req, res) => {
  const instituciones = await pool.query(`Select * from instituciones`);
  res.json(instituciones);
}; //

//Eliminar instituciones
institucionesCtrl.eliminaInstitucion = async (req, res) => {

  const instituciones = await pool.query(
    `delete from domicilios `
    );
};

module.exports = institucionesCtrl;
