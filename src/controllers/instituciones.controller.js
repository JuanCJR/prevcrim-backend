institucionesCtrl = {};
const pool = require("../database/dataBase");
const dbHelper = require("../database/dbHelper");

//lista sectores por institucion
institucionesCtrl.getSectores = async (req, res) => {
  const { cod_institucion } = req.query;

  const sectores = await pool.query(
    `select nombre_sector,desc_sector 
  from sectores
  where cod_institucion = ?
`,
    [cod_institucion]
  );

  res.json(sectores);
};

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
  const { cod_institucion } = req.body;

  const sectores = await pool.query(
    `select * from sectores 
  where cod_institucion = ? `,
    [cod_institucion]
  );

  const usuarios = await pool.query(
    `select * from usuarios 
  where cod_institucion = ? `,
    [cod_institucion]
  );

  if (sectores.length) {
    res.json({ message: "sectores-true" });
  } else if (usuarios.length) {
    res.json({ message: "usuarios-true" });
  } else {
    await pool.query(`delete from instituciones where cod_institucion = ?`, [
      cod_institucion,
    ]);
    res.json({ message: "ok" });
  }
};

//Actualizar instituciones
institucionesCtrl.actualizarInstitucion = async (req, res) => {
  const { institucionInfo } = req.body;
  const actualizarInstituciones = await pool.query(
    "update instituciones set nombre_institucion = ?, modificado_por= ? where cod_institucion= ?",
    [
      institucionInfo.nombreInstitucion,
      institucionInfo.creadoPor,
      institucionInfo.cod_institucion,
    ]
  );
};

module.exports = institucionesCtrl;
