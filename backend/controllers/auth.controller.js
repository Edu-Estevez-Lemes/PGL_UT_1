// backend/controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const Cliente = db.clientes;
const SALT_ROUNDS = 10;

// ───────────────── REGISTRO (JSON) ─────────────────
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .send({ message: 'Faltan campos (nombre, email, password)' });
    }

    const exists = await Cliente.findOne({ where: { email } });
    if (exists) {
      return res.status(409).send({ message: 'Email ya registrado' });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const c = await Cliente.create({
      nombre,
      email,
      telefono: telefono || '',
      password_hash,
      rol: 'user',
    });

    // NO devolvemos el hash
    res.status(201).send({
      id: c.id,
      nombre: c.nombre,
      email: c.email,
      rol: c.rol,
    });
  } catch (e) {
    console.error('❌ Error en register:', e);
    res.status(500).send({ message: e.message });
  }
};

// ───────────────── LOGIN BASIC (para el PDF) ─────────────────
// GET /api/auth/login con cabecera Authorization: Basic xxx
exports.loginBasic = async (req, res) => {
  try {
    const h = req.headers['authorization'] || '';
    if (!h.startsWith('Basic ')) {
      return res
        .status(401)
        .set(
          'WWW-Authenticate',
          `Basic realm="${process.env.BASIC_REALM || 'TapeLab'}"`
        )
        .send('Auth required');
    }

    const raw = Buffer.from(h.slice(6), 'base64').toString('utf8');
    const [email, password] = raw.split(':');

    const c = await Cliente.findOne({ where: { email } });
    if (!c || !c.password_hash) {
      return res.status(401).send({ message: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, c.password_hash);
    if (!ok) {
      return res.status(401).send({ message: 'Credenciales inválidas' });
    }

    const payload = { sub: c.id, email: c.email, rol: c.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    res.send({
      token,
      user: { id: c.id, nombre: c.nombre, email: c.email, rol: c.rol },
    });
  } catch (e) {
    console.error('❌ Error en loginBasic:', e);
    res.status(500).send({ message: e.message });
  }
};

// ───────────────── LOGIN JSON (para Ionic / Postman JSON) ─────────────────
// POST /api/auth/login  { "email": "...", "password": "..." }
exports.loginJson = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Faltan campos (email, password)' });
    }

    const c = await Cliente.findOne({ where: { email } });
    if (!c || !c.password_hash) {
      return res.status(401).send({ message: 'Credenciales inválidas' });
    }

    // Aquí bcrypt compara la contraseña en plano con el hash guardado
    const ok = await bcrypt.compare(password, c.password_hash);
    if (!ok) {
      return res.status(401).send({ message: 'Credenciales inválidas' });
    }

    const payload = { sub: c.id, email: c.email, rol: c.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    res.send({
      token,
      user: { id: c.id, nombre: c.nombre, email: c.email, rol: c.rol },
    });
  } catch (e) {
    console.error('❌ Error en loginJson:', e);
    res.status(500).send({ message: e.message });
  }
};
