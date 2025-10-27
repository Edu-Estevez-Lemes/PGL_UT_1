module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const router = require("express").Router();
  const upload = require("../middlewares/upload"); // <- ruta corregida

  // Crear cliente (con imagen)
  router.post("/", upload.single("imagen"), clientes.create);

  // Obtener todos los clientes
  router.get("/", clientes.findAll);

  // Obtener un cliente por ID
  router.get("/:id", clientes.findOne);

  // Actualizar cliente (permite nueva imagen)
  router.put("/:id", upload.single("imagen"), clientes.update);

  // Eliminar cliente
  router.delete("/:id", clientes.delete);

  app.use("/api/clientes", router);
};
