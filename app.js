const express = require("express");
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qehyw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('conexion exitosa a la base de datos'))
  .catch(e => console.log('error de conexion', e))

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

//rutas de la api
app.use('/', require('./router/rutasWeb'))
app.use('/mascotas', require('./router/Mascotas'))



app.use((req, res, next) => {
  res.status(404).render("404");
});
app.listen(port, () => {
  console.log(`listen http://localhost:${port}`);
});
