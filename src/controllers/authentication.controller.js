AuthCtrl = {};
const helpers = require("../lib/helpers");
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

  await dbHelper.CreaUsuario(infoUsuario);
  res.json({ message: "peticion recibida " });
};

//Funcion para listar usuarios
AuthCtrl.listaUsuarios = async (req, res) => {
  const usuarios = await dbHelper.ListarUsuario();
  console.log(usuarios);

  res.json(usuarios);
};

AuthCtrl.eliminarUsuarios = async (req, res) => {
  const { rut_usuario } = req.body;
  const eliminar = await dbHelper.EliminarUsuarios(rut_usuario);
  res.json(eliminar);
};

AuthCtrl.creaOperador = (req, res) => {};

module.exports = AuthCtrl;
