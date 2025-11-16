
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.clientes = require("./cliente.model.js")(sequelize, DataTypes);
db.peliculas = require("./pelicula.model.js")(sequelize, DataTypes);
db.alquileres = require("./alquiler.model.js")(sequelize, DataTypes);

// Relaciones
db.clientes.hasMany(db.alquileres, {
  foreignKey: "clienteId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
db.alquileres.belongsTo(db.clientes, { foreignKey: "clienteId" });

db.peliculas.hasMany(db.alquileres, {
  foreignKey: "peliculaId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
db.alquileres.belongsTo(db.peliculas, { foreignKey: "peliculaId" });

module.exports = db;
