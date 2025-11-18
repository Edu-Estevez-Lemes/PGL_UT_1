const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports = async function(req, res, next) {
  const h = req.headers['authorization'] || '';
  if (!h.startsWith('Bearer ')) return res.status(401).send('Token required');

  const token = h.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.clientes.findByPk(payload.sub);
    if (!user) return res.status(401).send('Invalid token');
    req.user = user;
    req.jwt = payload;
    next();
  } catch {
    return res.status(401).send('Invalid/expired token');
  }
};
