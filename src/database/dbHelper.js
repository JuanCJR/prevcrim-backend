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
  
};

//funcion para eliminar usuarios

dbHelper.EliminarUsuarios= async (rut_usuario) =>{
  
  const eliminarDomicilio = await pool.query (
    "delete from domicilios join usuarios on usuarios.cod_domicilio=domicilio.cod_domicilio where rut_usuario = ?", [rut_usuario]);

    const eliminar = await pool.query ("delete from usuarios where rut_usuario = ?", [rut_usuario]);
};

module.exports = dbHelper;
