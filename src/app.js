const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });
const express = require("express");
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

//Rutas

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

module.exports = app;
