module.exports = (sequelize, DataTypes) => {
  const Alquiler = sequelize.define("Alquiler", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clienteId: { type: DataTypes.INTEGER, allowNull: false },
    peliculaId: { type: DataTypes.INTEGER, allowNull: false },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    fecha_fin: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: "alquileres",
    timestamps: false
  });

  return Alquiler;
};

