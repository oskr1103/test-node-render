const express = require('express')
const router = express.Router()

router.get("/servicios", (req, res) => {
  res.render("servicios", { titulo: "Página de servicios" });
});

router.get("/", (req, res) => {
  res.render("index", { titulo: "Mi título dinámico" });
});



module.exports = router