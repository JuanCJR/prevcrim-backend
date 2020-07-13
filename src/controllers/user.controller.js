userCtrl = {};
const pool = require("../database/dataBase");
const helpers = require("../lib/helpers");

//Funcion para listar toda la info de un usuario
userCtrl.obtieneUsuario = async (req, res) => {
  const { rut_usuario, cod_institucion } = req.body;
  if (cod_institucion) {
    const usuario = await pool.query(
      `
  select usuarios.rut_usuario, usuarios.nombre_usuario, usuarios.apellidos,usuarios.email, domicilios.calle,
  domicilios.numero,domicilios.numero_domicilio,comunas.cod_comuna,comunas.nombre_comuna,
  regiones.cod_region,regiones.region_ordinal,regiones.nombre_region, usuarios.fecha_creacion, 
  usuarios.fecha_modificacion, usuarios.modificado_por,instituciones.nombre_institucion
  from usuarios
  join domicilios on usuarios.cod_domicilio=domicilios.cod_domicilio
  join comunas on domicilios.cod_comuna = comunas.cod_comuna
  join regiones on comunas.cod_region = regiones.cod_region
  join instituciones on usuarios.cod_institucion = instituciones.cod_institucion
  where rut_usuario = ?`,
      [rut_usuario]
    );
    res.json(usuario);
  } else {
    const usuario = await pool.query(
      `
  select usuarios.rut_usuario, usuarios.nombre_usuario, usuarios.apellidos,usuarios.email, domicilios.calle,
  domicilios.numero,domicilios.numero_domicilio,comunas.cod_comuna,comunas.nombre_comuna,
  regiones.cod_region,regiones.region_ordinal,regiones.nombre_region, usuarios.fecha_creacion, 
  usuarios.fecha_modificacion, usuarios.modificado_por
  from usuarios
  join domicilios on usuarios.cod_domicilio=domicilios.cod_domicilio
  join comunas on domicilios.cod_comuna = comunas.cod_comuna
  join regiones on comunas.cod_region = regiones.cod_region
  where rut_usuario = ?`,
      [rut_usuario]
    );
    res.json(usuario);
  }
};

//Funcion para listar todos los usuarios
userCtrl.listaUsuarios = async (req, res) => {
  //  const usuarios = await dbHelper.ListarUsuario();
  const usuarios = await pool.query("select * from usuarios");

  res.json(usuarios);
};
//Funcion para eliminar usuarios
userCtrl.eliminarUsuario = async (req, res) => {
  const { rut_usuario } = req.body;
  const eliminaDataUsuario = await pool.query(
    "delete domicilios,usuarios from domicilios join usuarios on usuarios.cod_domicilio=domicilios.cod_domicilio where rut_usuario = ?",
    [rut_usuario]
  );
  if (eliminaDataUsuario.affectedRows > 0) {
    res.json({
      message: "Usuario Eliminado",
      code: "delete-true",
    });
  } else {
    res.json({
      message: "No se ha eliminado el usuario",
      code: "delete-false",
    });
  }
};

//Funcion para actualizar usuarios
userCtrl.actualizarUsuarios = async (req, res) => {
  const { infoUsuario } = req.body;

  const actualizaDomicilioUsuario = await pool.query(
    `update domicilios join usuarios on usuarios.cod_domicilio=domicilios.cod_domicilio 
    SET domicilios.modificado_por = ?,calle= ?, numero= ?, numero_domicilio= ?, cod_comuna= ? 
    where rut_usuario = ?`,
    [
      infoUsuario.modificadoPor,
      infoUsuario.calle,
      infoUsuario.numero,
      infoUsuario.numeroDomicilio,
      infoUsuario.codComuna,
      infoUsuario.rut,
    ]
  );

  if(infoUsuario.changePasswd){
    const claveActualizada = await helpers.encryptPassword(infoUsuario.clave);

    const actualizaDataUsuario = await pool.query(
      "update usuarios SET nombres= ?, apellidos= ?, email= ?, clave= ?, tipo_usuario= ?,cod_institucion = ?, modificado_por= ? where rut_usuario = ?",
      [
        infoUsuario.nombres,
        infoUsuario.apellidos,
        infoUsuario.email,
        claveActualizada,
        infoUsuario.tipoUsuario,
        infoUsuario.codInstitucion,
        infoUsuario.modificadoPor,
        infoUsuario.rut,
      ]
    );
  }else{


    const actualizaDataUsuario = await pool.query(
      "update usuarios SET nombres= ?, apellidos= ?, email= ?, tipo_usuario= ?,cod_institucion = ?, modificado_por= ? where rut_usuario = ?",
      [
        infoUsuario.nombres,
        infoUsuario.apellidos,
        infoUsuario.email,
        infoUsuario.tipoUsuario,
        infoUsuario.codInstitucion,
        infoUsuario.modificadoPor,
        infoUsuario.rut,
      ]
    );


  }

  

  res.json({ message: "ok" });
};

module.exports = userCtrl;
