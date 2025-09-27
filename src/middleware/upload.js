// ===========================================================
// Archivo: src/middleware/upload.js
// Propósito: Configurar Multer para guardar evidencias
// ===========================================================
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/srv/f-report/uploads';

// Asegura que el directorio exista
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// yyyyMMddHHmmss
function ts14() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate()),
    pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds()),
  ].join('');
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),

  // IMPORTANTE: el frontend debe enviar los metadatos
  // ANTES del campo 'file' para que estén en req.body aquí.
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname || '') || '.bin').toLowerCase();
    const idRep = (req.body?.id_reporte ?? 'X').toString();
    const idTipo = (req.body?.id_tipo_evidencia ?? 'X').toString();
    const stamp = ts14();

    // EVI_<reporte>_<tipo>_<YYYYMMDDhhmmss>.<ext>
    const finalName = `EVI_${idRep}_${idTipo}_${stamp}${ext}`;
    cb(null, finalName);
  },
});

const ACCEPTED = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

const fileFilter = (_req, file, cb) => {
  if (ACCEPTED.has(file.mimetype)) cb(null, true);
  else cb(new Error('Formato no permitido. Use JPG, PNG, WEBP o PDF.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter,
});

module.exports = { upload, UPLOAD_DIR };
