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
  console.log(req.body);
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

  
  res.json(usuarios);
};

AuthCtrl.creaOperador = (req, res) => {};

module.exports = AuthCtrl;
