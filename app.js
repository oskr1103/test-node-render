const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.get("/frutas", (req, res) => {
  res.render("frutas", { titulo: "Página de frutas" });
});

app.get("/", (req, res) => {
  res.render("index", { titulo: "Mi título dinámico" });
});

app.get("/jsonfrutas", (req, res) => {
  res.send({
    frutas: {
      manzana: {
        nombre: "Manzana",
        estado: "verde",
        cantidad: 20
      },
       pera: {
        nombre: "Pera",
        estado: "Maduro",
        cantidad: 35
      },
        banano: {
        nombre: "Banano",
        estado: "verde",
        cantidad: 15
      }
    }
  });
});

app.use((req, res, next) => {
  res.status(404).render("404");
});
app.listen(port, () => {
  console.log(`listen http://localhost:${port}`);
});
