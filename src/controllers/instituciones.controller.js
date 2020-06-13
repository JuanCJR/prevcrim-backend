institucionesCtrl = {};
const pool = require("../database/dataBase");
const dbHelper = require("../database/dbHelper");

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
  const {cod_instituciones} =req.body;
  const eliminaInstituciones = await pool.query(
    `delete from instituciones where cod_instituciones = ?`, [cod_instituciones]
  );
    if (eliminaInstituciones.affectedRows > 0) {
      res.json({
        message: "Institucion Eliminada",
        code: "delete-true",
      });
    } else {
      res.json({
        message: "No se ha eliminado la Institución",
        code: "delete-false",
      });
    }
};

//Actualizar instituciones
institucionesCtrl.actualizarInstitucion =async (req,res) => {
  const {institucionInfo} =req.body;
  const actualizarInstituciones = await pool.query (
    "update instituciones set nombre_institucion = ?, modificado_por= ? where cod_instituciones= ?",
    [
      institucionInfo.nombreInstitucion,
      institucionInfo.creadoPor,
      institucionInfo.cod_instituciones
    ]
  );


};

module.exports = institucionesCtrl;
