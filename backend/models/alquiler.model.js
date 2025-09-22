module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Alquiler", {
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE }
  }, {
    tableName: "alquileres",
    timestamps: false
  });
};
