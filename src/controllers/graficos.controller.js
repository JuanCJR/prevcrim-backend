const graficosCtrl = {};
const pool = require("../database/dataBase");

//Funcion que devuelve acumulado de delitos por mes
graficosCtrl.acumuladoDelitos = async (req, res) => {
  const { year } = req.query;

  const delitos = await pool.query(
    `select count(*) as delitos,MONTH(fecha_delito) as nro_mes, date_format(fecha_delito,"%b") as mes
from delitos
where year(fecha_delito) = ?
group by month(fecha_delito)
order by month(fecha_delito)`,
    [year]
  );

  res.json(delitos);
};

module.exports = graficosCtrl;
