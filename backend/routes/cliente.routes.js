module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const router = require("express").Router();
  const upload = require("../middlewares/upload"); // igual, corregido el path

  // Crear cliente (con imagen)
  router.post("/", upload.single("file"), clientes.create);

  // Obtener todos los clientes
  router.get("/", clientes.findAll);

  // Obtener un cliente por id
  router.get("/:id", clientes.findOne);

  // Actualizar cliente (permite nueva imagen)
  router.put("/:id", upload.single("file"), clientes.update);

  // Eliminar cliente
  router.delete("/:id", clientes.delete);

  app.use("/api/clientes", router);
};
