module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Pelicula", {
    titulo: { type: DataTypes.STRING, allowNull: false },
    genero: DataTypes.STRING,
    anio: DataTypes.INTEGER,
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: "peliculas",
    timestamps: false
  });
};
