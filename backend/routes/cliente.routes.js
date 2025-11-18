module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const router = require("express").Router();
  const upload = require("../middlewares/upload"); // <- ruta corregida
  const authBearer = require ("../middlewares/auth-bearer");

  // Crear cliente (con imagen)
  router.post("/", authBearer, upload.single("imagen"), clientes.create);

  // Obtener todos los clientes
  router.get("/", authBearer, clientes.findAll);

  // Obtener un cliente por ID
  router.get("/:id", authBearer, clientes.findOne);

  // Actualizar cliente (permite nueva imagen)
  router.put("/:id", authBearer, upload.single("imagen"), clientes.update);

  // Eliminar cliente
  router.delete("/:id", authBearer, clientes.delete);

  app.use("/api/clientes", router);
};
