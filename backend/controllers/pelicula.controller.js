const db = require("../models");
const Pelicula = db.peliculas;

// Crear una nueva película
exports.create = (req, res) => {
  if (!req.body.titulo) {
    res.status(400).send({ message: "El título es obligatorio" });
    return;
  }

  Pelicula.create({
    titulo: req.body.titulo,
    genero: req.body.genero,
    anio: req.body.anio,
    disponible: req.body.disponible ?? true
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener todas las películas
exports.findAll = (req, res) => {
  Pelicula.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener una película por ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Pelicula.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No existe película con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Actualizar película
exports.update = (req, res) => {
  const id = req.params.id;
  Pelicula.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Película actualizada" });
      else res.send({ message: `No se pudo actualizar la película con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Eliminar película
exports.delete = (req, res) => {
  const id = req.params.id;
  Pelicula.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Película eliminada" });
      else res.send({ message: `No se pudo eliminar la película con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
