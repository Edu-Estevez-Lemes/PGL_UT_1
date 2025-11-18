// Guarda imágenes en /public/images

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

function ts() {
  const d = new Date();
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate())
  ].join('') + '-' +
  [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join('') +
  '-' + pad(d.getMilliseconds(), 3);
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public/images');
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname || '').toLowerCase(); // .jpg/.png...
    const rand = crypto.randomBytes(3).toString('hex'); // 6 hex chars
    const name = `img-${ts()}-${rand}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

module.exports = upload;
