module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "PGL1+",
  DB: "videoclub",   //base de datos
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
// DATOS DE LA CONFIGURACIÓN DE LA CONEXIÓN CON LA BASE DE DATOS