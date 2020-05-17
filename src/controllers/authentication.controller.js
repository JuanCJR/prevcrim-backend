AuthCtrl = {};
const helpers = require("../lib/helpers");
const dbHelper = require("../database/dbHelper");
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

AuthCtrl.creaOperador = (req, res) => {};

module.exports = AuthCtrl;
