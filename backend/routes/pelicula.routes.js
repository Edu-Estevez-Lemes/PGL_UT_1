module.exports = app => {
  const peliculas = require("../controllers/pelicula.controller.js");
  const router = require("express").Router();
  const upload = require("../middlewares/upload"); // ruta correcta (middlewares, no middleware)

  // Crear película (con imagen)
  router.post("/", upload.single("file"), peliculas.create);

  // Obtener todas las películas
  router.get("/", peliculas.findAll);

  // Obtener una película por id
  router.get("/:id", peliculas.findOne);

  // Actualizar película (permite nueva imagen)
  router.put("/:id", upload.single("file"), peliculas.update);

  // Eliminar película
  router.delete("/:id", peliculas.delete);

  app.use("/api/peliculas", router);
};
