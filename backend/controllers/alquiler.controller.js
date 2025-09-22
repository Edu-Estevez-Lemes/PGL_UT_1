const db = require("../models");
const Alquiler = db.alquileres;
const Cliente = db.clientes;
const Pelicula = db.peliculas;

// Crear un nuevo alquiler
exports.create = (req, res) => {
  if (!req.body.fecha_inicio || !req.body.clienteId || !req.body.peliculaId) {
    res.status(400).send({ message: "clienteId, peliculaId y fecha_inicio son obligatorios" });
    return;
  }

  Alquiler.create({
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    clienteId: req.body.clienteId,
    peliculaId: req.body.peliculaId
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener todos los alquileres (con cliente y película)
exports.findAll = (req, res) => {
  Alquiler.findAll({ include: [Cliente, Pelicula] })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener un alquiler por ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Alquiler.findByPk(id, { include: [Cliente, Pelicula] })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No existe alquiler con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Actualizar alquiler
exports.update = (req, res) => {
  const id = req.params.id;
  Alquiler.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Alquiler actualizado" });
      else res.send({ message: `No se pudo actualizar el alquiler con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Eliminar alquiler
exports.delete = (req, res) => {
  const id = req.params.id;
  Alquiler.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Alquiler eliminado" });
      else res.send({ message: `No se pudo eliminar el alquiler con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
