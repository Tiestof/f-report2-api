// ===========================================================
// Archivo: src/middleware/upload.js
// Propósito: Configurar Multer para guardar archivos de
//            Evidencias y Gastos (genérico, sin romper nada).
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

/**
 * Nota de diseño:
 * - Este middleware ahora es GENÉRICO.
 * - Si la ruta base incluye "gastos" → prefijo "GAS" y usa id_tipo_gasto.
 * - En cualquier otro caso (evidencias) → prefijo "EVI" y usa id_tipo_evidencia.
 * - Siempre usa id_reporte del body.
 * - El frontend DEBE enviar los metadatos ANTES del `file` para que Multer
 *   los tenga disponibles en req.body aquí (el modal ya lo hace así).
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),

  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname || '') || '.bin').toLowerCase();

    // Detección simple por baseUrl/ruta para distinguir Gastos vs Evidencias
    const base = (req.baseUrl || '') + (req.path || '');
    const isGasto = /gastos/i.test(base);

    const idRep = (req.body?.id_reporte ?? 'X').toString();

    // Toma el tipo adecuado según el flujo, con fallback
    const idTipo =
      (isGasto
        ? (req.body?.id_tipo_gasto ?? req.body?.id_tipo_evidencia)
        : (req.body?.id_tipo_evidencia ?? req.body?.id_tipo_gasto)) ?? 'X';

    const stamp = ts14();
    const prefix = isGasto ? 'GAS' : 'EVI';

    // Formato:
    //  - Evidencias: EVI_<reporte>_<tipo>_<YYYYMMDDhhmmss>.<ext>
    //  - Gastos:    GAS_<reporte>_<tipo>_<YYYYMMDDhhmmss>.<ext>
    // Importante: el controller de gastos igual renombra con id_gasto más adelante,
    // pero esto evita "X" innecesarios y mantiene consistencia.
    const finalName = `${prefix}_${idRep}_${idTipo}_${stamp}${ext}`;
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
