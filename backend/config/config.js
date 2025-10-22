require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'PGL1+',
    database: process.env.DB_NAME || 'videoclub',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
};



// DATOS DE LA CONFIGURACIÓN DE LA CONEXIÓN CON LA BASE DE DATOS