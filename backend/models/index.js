const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.clientes = require("./cliente.model.js")(sequelize, DataTypes);
db.peliculas = require("./pelicula.model.js")(sequelize, DataTypes);
db.alquileres = require("./alquiler.model.js")(sequelize, DataTypes);

// Relaciones
db.clientes.hasMany(db.alquileres, { foreignKey: "clienteId" });
db.alquileres.belongsTo(db.clientes, { foreignKey: "clienteId" });

db.peliculas.hasMany(db.alquileres, { foreignKey: "peliculaId" });
db.alquileres.belongsTo(db.peliculas, { foreignKey: "peliculaId" });

module.exports = db;
