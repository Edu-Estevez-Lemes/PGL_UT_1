module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Kriptologia1+",
  DB: "videoclub",   //base de datos
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
