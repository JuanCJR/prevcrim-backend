const delitosCtrl = {};
const pool = require("../database/dataBase");

//Funcion para crear un nuevo delito
delitosCtrl.nuevoDelito = async (req, res) => {
  const { infoDelito } = req.body;
  //-----------Caso de que el delincuente si existe-----------//

  if (infoDelito.delincuenteRegistrado) {
    const delincuente = await pool.query(
      `SELECT * from delincuentes
    WHERE cod_delincuente = ?`,
      [infoDelito.cod_delincuente]
    );

    if (infoDelito.actualizaUltimoVisto) {
      //insercion en tabla de ultimo visto
      const ultimo_visto = await pool.query(
        `UPDATE ultimo_visto join delincuentes
      on delincuentes.cod_ultimo_visto = ultimo_visto.cod_ultimo_visto SET 
      calle = ?, numero = ?, numero_domicilio = ?, cod_comuna = ?, cod_sector = ?,
      ultimo_visto.modificado_por = ? where cod_delincuente = ?`,
        [
          infoDelito.ultimo_visto.calle,
          infoDelito.ultimo_visto.numero,
          infoDelito.ultimo_visto.numero_domicilio,
          infoDelito.ultimo_visto.cod_comuna,
          infoDelito.ultimo_visto.cod_sector,
          infoDelito.creadoPor,
          delincuente[0].cod_ultimo_visto,
        ]
      );
    }

    //insercion en tabla de direccion de delitos
    const direccionDelito = await pool.query(
      "INSERT INTO direccion_delito SET ?",
      {
        calle: infoDelito.delito.calle,
        numero: infoDelito.delito.numero,
        numero_domicilio: infoDelito.delito.numero_domicilio,
        cod_comuna: infoDelito.delito.cod_comuna,
        cod_sector: infoDelito.delito.cod_sector,
        modificado_por: infoDelito.creadoPor,
      }
    );
    //insercion en tabla de delitos
    await pool.query(`INSERT INTO delitos SET ? `, {
      desc_delito: infoDelito.desc_delito,
      tipo_delito: infoDelito.tipo_delito,
      cod_delincuente: delincuente[0].cod_delincuente,
      cod_direccion_delito: direccionDelito.insertId,
      modificado_por: infoDelito.creadoPor,
    });
    res.json({ message: "ok" });
  } else {
    //-----------Caso de que el delincuente no exista-----------//

    //insercion en tabla de domicilios
    const domicilio = await pool.query("INSERT INTO domicilios SET ?", {
      calle: infoDelito.calle,
      numero: infoDelito.numero,
      numero_domicilio: infoDelito.numero_domicilio,
      cod_comuna: infoDelito.cod_comuna,
      modificado_por: infoDelito.creadoPor,
    });

    //insercion en tabla de ultimo visto
    const ultimo_visto = await pool.query("INSERT INTO ultimo_visto SET ?", {
      calle: infoDelito.ultimo_visto.calle,
      numero: infoDelito.ultimo_visto.numero,
      numero_domicilio: infoDelito.ultimo_visto.numero_domicilio,
      cod_comuna: infoDelito.ultimo_visto.cod_comuna,
      cod_sector: infoDelito.ultimo_visto.cod_sector,
      modificado_por: infoDelito.creadoPor,
    });

    //insecion en tabla de delincuentes
    const delincuente = await pool.query(`INSERT INTO delincuentes SET ?`, {
      rut_delincuente: infoDelito.rut_delincuente,
      nombres: infoDelito.nombres,
      apellidos: infoDelito.apellidos,
      telefono: infoDelito.telefono,
      celular: infoDelito.celular,
      email: infoDelito.email,
      fecha_nacimiento: infoDelito.fecha_nacimiento,
      estado_civil: infoDelito.estado_civil,
      nombres_conyugue: infoDelito.nombres_conyugue,
      apellidos_conyugue: infoDelito.apellidos_conyugue,
      cod_ultimo_visto: ultimo_visto.insertId,
      cod_domicilio: domicilio.insertId,
      modificado_por: infoDelito.creadorPor,
    });

    //insercion en tabla de direccion de delitos
    const direccionDelito = await pool.query(
      "INSERT INTO direccion_delito SET ?",
      {
        calle: infoDelito.delito.calle,
        numero: infoDelito.delito.numero,
        numero_domicilio: infoDelito.delito.numero_domicilio,
        cod_comuna: infoDelito.delito.cod_comuna,
        cod_sector: infoDelito.delito.cod_sector,
        modificado_por: infoDelito.creadoPor,
      }
    );

    //insercion en tabla de delitos
    await pool.query(`INSERT INTO delitos SET ? `, {
      desc_delito: infoDelito.desc_delito,
      tipo_delito: infoDelito.tipo_delito,
      cod_delincuente: delincuente.insertId,
      cod_direccion_delito: direccionDelito.insertId,
      modificado_por: infoDelito.creadoPor,
    });

    res.json({ message: "ok" });
  }
};

//funcion para listar delitos
delitosCtrl.getDelitos = async (req, res) => {
  const delitos = await pool.query("SELECT * FROM delitos");
  res.json(delitos);
};

//Funcion para buscar delincuente
delitosCtrl.getDelincuente = async (req, res) => {
  const { cod_delincuente } = req.body;

  const delincuente = await pool.query(
    `SELECT * from delincuentes
WHERE cod_delincuente = ?`,
    [cod_delincuente]
  );

  res.json(delincuente);
};

module.exports = delitosCtrl;
