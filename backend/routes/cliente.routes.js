module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const router = require("express").Router();

  // Crear cliente
  router.post("/", clientes.create);

  // Obtener todos los clientes
  router.get("/", clientes.findAll);

  // Obtener un cliente por id
  router.get("/:id", clientes.findOne);

  // Actualizar un cliente
  router.put("/:id", clientes.update);

  // Eliminar un cliente
  router.delete("/:id", clientes.delete);

  app.use("/api/clientes", router);
};
