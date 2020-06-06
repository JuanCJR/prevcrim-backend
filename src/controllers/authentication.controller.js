AuthCtrl = {};
const helpers = require("../lib/helpers");
const pool = require("../database/dataBase");

const dbHelper = require("../database/dbHelper");
//funcion para crear usuario
AuthCtrl.creaUsuario = async (req, res) => {
  const {
    rut,
    nombreUsuario,
    nombres,
    apellidos,
    clave,
    tipoUsuario,
    calle,
    email,
    numero,
    numeroDomicilio,
    codComuna,
    creadoPor,
  } = req.body;
  //Objeto de informacion del usuario
  const infoUsuario = {
    rut,
    nombreUsuario,
    nombres,
    apellidos,
    clave,
    tipoUsuario,
    calle,
    email,
    numero,
    numeroDomicilio,
    codComuna,
    creadoPor,
  };

  const domicilios = await pool.query(
    "SELECT count(*) as count FROM domicilios"
  );
  const cod_domicilio = domicilios[0].count + 1;
  await pool.query("INSERT INTO domicilios SET ?", {
    cod_domicilio: cod_domicilio,
    calle: calle,
    numero: numero,
    numero_domicilio: numeroDomicilio,
    cod_comuna: codComuna,
    modificado_por: creadoPor,
  });

  const claveEncrypt = await helpers.encryptPassword(clave);

  const usuario = await pool.query("INSERT INTO usuarios SET ?", {
    rut_usuario: rut,
    nombre_usuario: nombreUsuario,
    nombres: nombres,
    apellidos: apellidos,
    email: email,
    clave: claveEncrypt,
    cod_domicilio: cod_domicilio,
    tipo_usuario: tipoUsuario,
    modificado_por: creadoPor,
  });

  res.json({ message: "peticion recibida " });
};

//Funcion para listar usuarios
AuthCtrl.listaUsuarios = async (req, res) => {
  //  const usuarios = await dbHelper.ListarUsuario();
  const usuarios = await pool.query("select * from usuarios");

  console.log(usuarios);

  res.json(usuarios);
};
//Funcion para eliminar usuarios
AuthCtrl.eliminarUsuarios = async (req, res) => {
  const { rut_usuario } = req.body;
  const eliminar = await dbHelper.EliminarUsuarios(rut_usuario);
  res.json(eliminar);
};

//Funcion para actualizar usuarios
AuthCtrl.actualizarUsuarios = async (req, res) => {
  const { infoUsuario } = req.body;
  const actualizar = await dbHelper.ActualizarUsuarios(infoUsuario);
  res.json(actualizar);
};

module.exports = AuthCtrl;
