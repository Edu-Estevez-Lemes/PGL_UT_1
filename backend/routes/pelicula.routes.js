module.exports = app => {
  const peliculas = require("../controllers/pelicula.controller.js");
  const router = require("express").Router();

  // Crear película
  router.post("/", peliculas.create);

  // Obtener todas las películas
  router.get("/", peliculas.findAll);

  // Obtener una película por id
  router.get("/:id", peliculas.findOne);

  // Actualizar película
  router.put("/:id", peliculas.update);

  // Eliminar película
  router.delete("/:id", peliculas.delete);

  app.use("/api/peliculas", router);
};
