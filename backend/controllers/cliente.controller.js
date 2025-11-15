const db = require("../models");
const Cliente = db.clientes;

// Crear un nuevo cliente
exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "El nombre es obligatorio" });
    return;
  }

  // Si se subió imagen, guardamos el nombre del archivo
  const imagen = req.file ? req.file.filename : null;

  Cliente.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    imagen: imagen
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener todos los clientes
exports.findAll = (req, res) => {
  Cliente.findAll({
    attributes: {exclude: ['password_hash']}  // Ocultamos la contraseña haseada en las respuestas a las solicitudes
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener un cliente por ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id, {
    attributes: { exclude: ['password_hash'] } 
  })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No existe cliente con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Actualizar cliente
exports.update = (req, res) => {
  const id = req.params.id;
  const nuevaImagen = req.file ? req.file.filename : undefined;

  const datosActualizados = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion
  };

  if (nuevaImagen) datosActualizados.imagen = nuevaImagen;

  Cliente.update(datosActualizados, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Cliente actualizado" });
      else res.send({ message: `No se pudo actualizar el cliente con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Eliminar cliente
exports.delete = (req, res) => {
  const id = req.params.id;
  Cliente.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Cliente eliminado" });
      else res.send({ message: `No se pudo eliminar el cliente con id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
