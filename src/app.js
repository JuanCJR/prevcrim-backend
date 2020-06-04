const path = require("path");
const dotenv = require("dotenv"); //Paquete para habilitar variables de entorno
dotenv.config({ path: path.join(__dirname, "../.env") }); //configuracion de dotenv
const express = require("express"); //Framework para levantar servidor
const passport = require("passport");
const cors = require("cors");
const pool = require("./database/dataBase");

pool.getConnection((err) => {
  if (err) throw err;
  console.log("DB Connected");
});

//Inicializaciones
const app = express();
//require("./lib/passport");

//Configuraciones
app.set("port", process.env.PORT || 8082);

//middlewares
app.use(cors());
app.use(passport.initialize()); //Indicamos a passport que se inicie
app.use(passport.session());

//Configuracion para permitir el uso de archivos json
app.use(express.json());

//Rutas
app.use("/api/authentication", require('./routes/authentication')); //Ruta para el manejo de autenticacion
app.use("/api/users", require('./routes/user')); //Ruta para el manejo de usuarios


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

module.exports = app;
