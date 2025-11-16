module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js');
  const upload = require('../middlewares/upload');   //usamos el mismo multer
  const router = require('express').Router();

  router.post('/register', upload.single('imagen'), auth.register);

  router.get('/login', auth.loginBasic);

  router.post('/login', auth.loginJson);

  app.use('/api/auth', router);
};
