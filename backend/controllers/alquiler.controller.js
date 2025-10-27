const db = require("../models");
const Alquiler = db.alquileres;
const Cliente = db.clientes;
const Pelicula = db.peliculas;

// Crear un nuevo alquiler
exports.create = async (req, res) => {
  try {
    const { clienteId, peliculaId, fecha_inicio, fecha_fin } = req.body;

    const nuevo = await Alquiler.create({
      clienteId,
      peliculaId,
      fecha_inicio,
      fecha_fin
    });

    res.send(nuevo);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener todos los alquileres con cliente y película (e imágenes)
exports.findAll = async (req, res) => {
  try {
    const data = await Alquiler.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["id", "nombre", "email", "telefono", "imagen"]
        },
        {
          model: Pelicula,
          attributes: ["id", "titulo", "genero", "anio", "imagen"]
        }
      ]
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener un alquiler por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Alquiler.findByPk(id, {
      include: [
        {
          model: Cliente,
          attributes: ["id", "nombre", "email", "telefono", "imagen"]
        },
        {
          model: Pelicula,
          attributes: ["id", "titulo", "genero", "anio", "imagen"]
        }
      ]
    });

    if (data) res.send(data);
    else res.status(404).send({ message: `No existe alquiler con id=${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Actualizar alquiler
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [num] = await Alquiler.update(req.body, { where: { id } });
    if (num === 1) res.send({ message: "Alquiler actualizado correctamente" });
    else res.send({ message: `No se pudo actualizar el alquiler con id=${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Eliminar alquiler
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Alquiler.destroy({ where: { id } });
    if (num === 1) res.send({ message: "Alquiler eliminado correctamente" });
    else res.send({ message: `No se pudo eliminar el alquiler con id=${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
