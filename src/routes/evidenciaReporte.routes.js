// ===========================================================
// Archivo: routes/evidenciaReporte.routes.js
// Descripción: Rutas para el módulo EvidenciaReporte
// ===========================================================
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/evidenciaReporte.controller');
const verifyToken = require('../middleware/verifyToken');
const { upload } = require('../middleware/upload');

// 🔐 Rutas protegidas con token
router.get('/', verifyToken([]), ctrl.getAll);

// IMPORTANTE: rutas específicas ANTES de '/:id'
router.get('/reporte/:id_reporte', verifyToken([]), ctrl.getByReporte);
router.get('/:id', verifyToken([]), ctrl.getById);

router.post('/', verifyToken([]), ctrl.create);
router.put('/:id', verifyToken([]), ctrl.update);
router.delete('/:id', verifyToken([]), ctrl.delete);

// ✅ Subida de archivo (field name: "file")
// Nota: este router se monta en /api/evidencias, por eso el path es '/upload'
router.post('/upload', verifyToken([]), upload.single('file'), ctrl.upload);

module.exports = router;
