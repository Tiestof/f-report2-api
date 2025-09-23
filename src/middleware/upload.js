// ===========================================================
// Archivo: src/middleware/upload.js
// Propósito: Configurar Multer para guardar evidencias
// ===========================================================
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/srv/f-report/uploads';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.bin';
    const unique = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    cb(null, `${unique}${ext}`);
  }
});

const ACCEPTED = new Set(['image/jpeg','image/png','image/webp','application/pdf']);

const fileFilter = (_req, file, cb) => {
  if (ACCEPTED.has(file.mimetype)) cb(null, true);
  else cb(new Error('Formato no permitido. Use JPG, PNG, WEBP o PDF.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

module.exports = { upload, UPLOAD_DIR };
