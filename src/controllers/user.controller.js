userCtrl = {};
const pool = require("../database/dataBase");
const helpers = require("../lib/helpers");


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

module.exports = userCtrl;
