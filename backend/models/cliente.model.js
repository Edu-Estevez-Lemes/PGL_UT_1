module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Cliente", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    telefono: DataTypes.STRING,
    imagen: { type: DataTypes.STRING },
    password_hash: { type: DataTypes.STRING},
    rol: { type: DataTypes.STRING, defaultValue: 'user' }
  }, {
    tableName: "clientes",
    timestamps: false
  });
};
