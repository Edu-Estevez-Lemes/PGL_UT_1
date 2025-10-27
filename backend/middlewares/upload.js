/**
 * Middleware de subida de imágenes con Multer
 * Guarda imágenes en /public/images/[clientes|peliculas]
 * Nombre de archivo: img-YYYYMMDD-HHMMSS-<random>.ext
 */

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

/** 🔹 Genera timestamp compacto: YYYYMMDD-HHMMSS */
function ts() {
  const d = new Date();
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate())
  ].join('') + '-' +
    [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join('');
}

/** 🔹 Crea la carpeta si no existe */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/** 🔹 Configuración de Multer */
const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
  let folder = 'public/images';

  // Detecta el tipo de recurso según la URL completa
  const url = req.originalUrl.toLowerCase();

  if (url.includes('clientes')) {
    folder = 'public/images/clientes';
  } else if (url.includes('peliculas')) {
    folder = 'public/images/peliculas';
  }

  ensureDir(folder);
  cb(null, folder);
},

  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const rand = crypto.randomBytes(3).toString('hex');
    const name = `img-${ts()}-${rand}${ext}`;
    cb(null, name);
  }
});

/** 🔹 Filtro de tipo MIME permitido */
function fileFilter(_req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Formato no permitido. Usa JPG, PNG o WEBP.'));
}

/** 🔹 Límite de tamaño (2MB) */
const limits = {
  fileSize: 2 * 1024 * 1024
};

/** 🔹 Inicializa el middleware */
const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
