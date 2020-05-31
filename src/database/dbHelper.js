const dbHelper = {};
const pool = require("../database/dataBase");
const helpers = require("../lib/helpers");
//Funcion para creacion de usuarios
dbHelper.CreaUsuario = async (infoUsuario) => {
  const domicilios = await pool.query(
    "SELECT count(*) as count FROM domicilios"
  );
  const cod_domicilio = domicilios[0].count + 1;
  await pool.query("INSERT INTO domicilios SET ?", {
    cod_domicilio: cod_domicilio,
    calle: infoUsuario.calle,
    numero: infoUsuario.numero,
    numero_domicilio: infoUsuario.numeroDomicilio,
    cod_comuna: infoUsuario.codComuna,
    modificado_por: infoUsuario.creadoPor,
  });

  const clave = await helpers.encryptPassword(infoUsuario.clave);

  const usuario = await pool.query("INSERT INTO usuarios SET ?", {
    rut_usuario: infoUsuario.rut,
    nombre_usuario: infoUsuario.nombreUsuario,
    nombres: infoUsuario.nombres,
    apellidos: infoUsuario.apellidos,
    email: infoUsuario.email,
    clave: clave,
    cod_domicilio: cod_domicilio,
    tipo_usuario: infoUsuario.tipoUsuario,
    modificado_por: infoUsuario.creadoPor,
  });
};

//Funcion para listar usuarios
dbHelper.ListarUsuario = async () => {
  const listado = await pool.query("select * from usuarios");
  return listado;
};

//funcion para eliminar usuarios
dbHelper.EliminarUsuarios = async (rut_usuario) => {
  const eliminaDataUsuario = await pool.query(
    "delete domicilios,usuarios from domicilios join usuarios on usuarios.cod_domicilio=domicilios.cod_domicilio where rut_usuario = ?",
    [rut_usuario]
  );
  if (eliminaDataUsuario.affectedRows > 0) {
    return { mensaje: "ok" };
  } else {
    return { mensaje: "error" };
  }
};

//funcion para actualizar usuarios
dbHelper.ActualizarUsuarios = async (infoUsuario) => {
   const actualizaDomicilioUsuario =await pool.query(
    "update domicilios SET cod_domicilio= ?, calle= ?, numero= ?, numero_domicilio= ?, cod_comuna= ?, modificado_por: ? where rut_usuario = ? ",
    [cod_domicilio, infoUsuario.calle, infoUsuario.numero, infoUsuario.numeroDomicilio, infoUsuario.codComuna, infoUsuario.creadoPor, infoUsuario.rut_usuario]
   )
    const claveActualizada = await helpers.encryptPassword(infoUsuario.clave);

    const actualizaDataUsuario = await pool.query(
      "update usuarios SET nombre_usuario= ?, nombres= ?, apellidos= ?, email= ?, clave= ?, cod_domicilio= ?, tipo_usuario= ?, modificado_por= ? where rut_usuario = ?",
      [infoUsuario.nombreUsuario, infoUsuario.nombres, infoUsuario.apellidos, infoUsuario.email, claveActualizada, cod_domicilio, infoUsuario.tipoUsuario, infoUsuario.creadoPor]
    );
};

module.exports = dbHelper;
