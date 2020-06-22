AuthCtrl = {};
const helpers = require("../lib/helpers");
const pool = require("../database/dataBase");

//funcion para crear usuario
AuthCtrl.creaUsuario = async (req, res) => {
  const { infoUsuario } = req.body;

  const domicilio = await pool.query("INSERT INTO domicilios SET ?", {
    calle: infoUsuario.calle,
    numero: infoUsuario.numero,
    numero_domicilio: infoUsuario.numeroDomicilio,
    cod_comuna: infoUsuario.codComuna,
    modificado_por: infoUsuario.creadoPor,
  });

  if (infoUsuario.tipoUsuario === "1") {
    infoUsuario.codInstitucion = 1;
  }
  const claveEncrypt = await helpers.encryptPassword(infoUsuario.clave);
  const usuario = await pool.query("INSERT INTO usuarios SET ?", {
    rut_usuario: infoUsuario.rut,
    nombre_usuario: infoUsuario.nombreUsuario,
    nombres: infoUsuario.nombres,
    apellidos: infoUsuario.apellidos,
    email: infoUsuario.email,
    fecha_nacimiento:infoUsuario.fecha_nacimiento,
    clave: claveEncrypt,
    cod_domicilio: domicilio.insertId,
    tipo_usuario: infoUsuario.tipoUsuario,
    modificado_por: infoUsuario.creadoPor,
    cod_institucion: infoUsuario.codInstitucion,
  });

  res.json({ message: "peticion recibida " });
};

//Funcion pora el inicio de sesion
AuthCtrl.Login = async (req, res) => {
  const { usuario } = req.body;
  const data = await pool.query(
    `SELECT * FROM usuarios 
  WHERE nombre_usuario = ? `,
    [usuario.nombreUsuario]
  );

  //Valida que el usuario exista
  if (data.length) {
    //Funcion para comparar contraseñas, en caso de ser correcta devuelve true
    const validaClave = await helpers.matchPassword(
      usuario.clave,
      data[0].clave
    );
    //Valida contraseña correcta
    if (validaClave) {
      res.json(data[0]);
    } else {
      res.json({
        message: "La contraseña no es correcta",
        code: "clave-false",
      });
    }
  } else {
    res.json({ message: "El usuario no existe", code: "usuario-false" });
  }
};

//Funcion para reconectar
AuthCtrl.reconectUser = async (req, res) => {
  const { rut_usuario } = req.body;
  const data = await pool.query(
    `SELECT * FROM usuarios 
  WHERE rut_usuario = ? `,
    [rut_usuario]
  );

  res.json(data);
};

module.exports = AuthCtrl;
