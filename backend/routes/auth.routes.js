// backend/routes/auth.routes.js
module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js');
  const router = require('express').Router();

  // Registro (JSON)
  router.post('/register', auth.register);

  // Basic Auth (para pruebas del enunciado)
  router.get('/login', auth.loginBasic);

  // Login normal para Ionic (JSON body)
  router.post('/login', auth.loginJson);

  app.use('/api/auth', router);
};
