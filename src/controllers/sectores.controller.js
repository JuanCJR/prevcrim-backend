sectoresCtrl = {};
const pool = require("../database/dataBase");

//funcion para eliminar sector
sectoresCtrl.eliminaSector = async (req, res) => {
  const { cod_sector, cod_institucion } = req.body;

  const delitos = await pool.query(
    `select * from direccion_delito
join delitos on delitos.cod_direccion_delito = direccion_delito.cod_direccion_delito
where cod_sector = ?`,
    [cod_sector]
  );

  const ultimo_visto = await pool.query(
    `select * from ultimo_visto
join delincuentes on delincuentes.cod_ultimo_visto = ultimo_visto.cod_ultimo_visto
where cod_sector = ?`,
    [cod_sector]
  );
  if (delitos.length) {
    res.json({ message: "delitos-true" });
  } else if (ultimo_visto.length) {
    res.json({ message: "delincuentes-true" });
  } else {
    await pool.query(
      `delete from almacen_sectores
    where cod_sector = ?`,
      [cod_sector]
    );
    await pool.query(
      `delete from sectores
    where cod_sector = ?`,
      [cod_sector]
    );
    const institucion = await pool.query(
      `select sectores from instituciones
    where cod_institucion= ? `,
      [cod_institucion]
    );
    await pool.query(
      `update instituciones set sectores = ?
    where cod_institucion = ?`,
      [institucion[0].sectores-1, cod_institucion]
    );
    res.json({ message: "ok" });

  }
};

//Funcion para actualiza sector
sectoresCtrl.actualizaSector = async (req, res) => {
  const { sectorInfo } = req.body;
  await pool.query(
    `UPDATE sectores set nombre_sector = ?, desc_sector = ?, cod_institucion = ?
  where cod_sector = ?
  `,
    [
      sectorInfo.nombre_sector,
      sectorInfo.desc_sector,
      sectorInfo.cod_institucion,
      sectorInfo.cod_sector,
    ]
  );

  res.json({ message: "ok" });
};

//modifica comunas del sector
sectoresCtrl.eliminarComunas = async (req, res) => {
  const { sectorInfo } = req.body;

  sectorInfo.comunasEliminadas.forEach(async (a) => {
    await pool.query(`delete from almacen_sectores where cod_almacen = ? `, [
      a.cod_almacen,
    ]);
  });

  res.json({ message: "ok" });
};

//modifica comunas del sector
sectoresCtrl.modificarComunas = async (req, res) => {
  const { sectorInfo } = req.body;

  sectorInfo.comunasDeSector.forEach(async (a) => {
    await pool.query(
      `UPDATE almacen_sectores SET cod_comuna = ? where cod_almacen = ? `,
      [a.cod_comuna, a.cod_almacen]
    );
  });

  res.json({ message: "ok" });
};

//Agrega comunas a un sector
sectoresCtrl.agregarComunas = async (req, res) => {
  const { sectorInfo } = req.body;
  sectorInfo.nuevasComunas.forEach(async (a) => {
    await pool.query(`INSERT INTO almacen_sectores SET ? `, {
      cod_sector: sectorInfo.cod_sector,
      cod_comuna: a.cod_comuna,
    });
  });

  res.json({ message: "ok" });
};

//Funcion para devolver comunas de un sector especifico
sectoresCtrl.getComunas = async (req, res) => {
  const { cod_sector } = req.query;
  const comunas = await pool.query(`
  select cod_almacen,cod_sector,b.cod_comuna, b.nombre_comuna, 
  concat(c.region_ordinal,"-",c.nombre_region) as region,
  c.cod_region, a.cod_almacen 
  from almacen_sectores a
  join comunas b on b.cod_comuna=a.cod_comuna
  join regiones c on c.cod_region=b.cod_region
  where cod_sector=${cod_sector}
  `);
  res.json(comunas);
};

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
  const { tipo_usuario, cod_institucion } = req.query;

  // valida tipo de usuario para devolver sectores
  if (tipo_usuario === "1") {
    const sectores = await pool.query(`SELECT cod_sector, nombre_sector,desc_sector,
  sectores.cod_institucion,nombre_institucion,sectores.fecha_modificacion,sectores.fecha_creacion,
  sectores.modificado_por   
  FROM sectores
    join instituciones 
    on instituciones.cod_institucion = sectores.cod_institucion
    order by cod_sector asc`);
    res.json(sectores);
  } else {
    const sectores = await pool.query(`SELECT cod_sector, nombre_sector,desc_sector,
    sectores.cod_institucion,nombre_institucion,sectores.fecha_modificacion,sectores.fecha_creacion,
    sectores.modificado_por   
    FROM sectores
      join instituciones 
      on instituciones.cod_institucion = sectores.cod_institucion
      where sectores.cod_institucion = ${cod_institucion}
      `);
    res.json(sectores);
  }
};

module.exports = sectoresCtrl;
