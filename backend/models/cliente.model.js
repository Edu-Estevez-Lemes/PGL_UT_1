module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Cliente", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    telefono: DataTypes.STRING
  }, {
    tableName: "clientes",
    timestamps: false
  });
};
