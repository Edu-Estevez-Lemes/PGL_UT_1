module.exports = app => {
  const alquileres = require("../controllers/alquiler.controller.js");
  const router = require("express").Router();
  const upload = require ("../middlewares/upload");

  // Crear alquiler
  router.post("/", alquileres.create);

  // Obtener todos los alquileres
  router.get("/", alquileres.findAll);

  // Obtener un alquiler por id
  router.get("/:id", alquileres.findOne);

  // Actualizar alquiler
  router.put("/:id", alquileres.update);

  // Eliminar alquiler
  router.delete("/:id", alquileres.delete);

  app.use("/api/alquileres", router);
};
