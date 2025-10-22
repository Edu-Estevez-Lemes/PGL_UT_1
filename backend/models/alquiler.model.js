module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Alquiler", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE },
    clienteId: { type: DataTypes.INTEGER, allowNull: false },
    peliculaId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "alquileres",
    timestamps: false
  });
};
