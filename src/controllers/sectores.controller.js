sectoresCtrl = {};
const pool = require("../database/dataBase");

//Funcion para crear sector
sectoresCtrl.nuevoSector = async (req, res) => {
  const { sectorInfo } = req.body;
  //Inserta en tabla de sectores
  const sector = await pool.query(`INSERT INTO sectores SET ?`, {
    nombre_sector: sectorInfo.nombre_sector,
    desc_sector: sectorInfo.desc_sector,
    cod_institucion: sectorInfo.cod_institucion,
    modificado_por: sectorInfo.creadoPor,
  });

  //Inserta en tabla de almacen de sectores
  sectorInfo.comunasDeSector.forEach(async (a) => {
    await pool.query(`INSERT INTO almacen_sectores SET ? `, {
      cod_sector: sector.insertId,
      cod_comuna: a.cod_comuna,
      modificado_por: sectorInfo.creadoPor,
    });
  });

  //Consigue numero de sectores por institucion
  const contadorSectores = await pool.query(
    `SELECT COUNT(*) as nro_sectores 
     from sectores 
     WHERE
     cod_institucion = ?`,
    [sectorInfo.cod_institucion]
  );

  //actualiza el numero de sectores de la institucion
  await pool.query(
    `UPDATE instituciones set sectores = ? WHERE 
 cod_institucion = ?`,
    [contadorSectores[0].nro_sectores, sectorInfo.cod_institucion]
  );

  res.json({ message: "ok" });
}; //

//Funcion para listar sectores
sectoresCtrl.getSectores = async (req, res) => {
  const sectores = await pool.query(`SELECT cod_sector, nombre_sector,desc_sector,
  sectores.cod_institucion,nombre_institucion,sectores.fecha_modificacion,sectores.fecha_creacion,
  sectores.modificado_por   
  FROM sectores
    join instituciones 
    on instituciones.cod_institucion = sectores.cod_institucion`);
  res.json(sectores);
};

module.exports = sectoresCtrl;
