const db = require("../models");
const Cliente = db.clientes;

// Crear un nuevo cliente
exports.create = (req, res) => {
  if (!req.body.nombre || !req.body.email) {
    res.status(400).send({ message: "Nombre y email son obligatorios" });
    return;
  }

  Cliente.create({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener todos los clientes
exports.findAll = (req, res) => {
  Cliente.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener un cliente por ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No existe cliente con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Actualizar un cliente
exports.update = (req, res) => {
  const id = req.params.id;
  Cliente.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Cliente actualizado" });
      else res.send({ message: `No se pudo actualizar el cliente con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Eliminar un cliente
exports.delete = (req, res) => {
  const id = req.params.id;
  Cliente.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Cliente eliminado" });
      else res.send({ message: `No se pudo eliminar el cliente con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

