// ===========================================================
// Archivo: gastoReporte.routes.js
// Descripción: Rutas para módulo de GastoReporte
// ===========================================================

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/gastoReporte.controller');
const verifyToken = require('../middleware/verifyToken');
const { upload } = require('../middleware/upload'); // mismo middleware que Evidencias

// Rutas protegidas por token (sin restricción de rol)
router.get('/', verifyToken([]), ctrl.getAll);

// IMPORTANTE: rutas específicas ANTES de '/:id'
router.get('/reporte/:id_reporte', verifyToken([]), ctrl.getByReporte);
router.get('/:id', verifyToken([]), ctrl.getById);

// CRUD
router.post('/', verifyToken([]), ctrl.create);
router.put('/:id', verifyToken([]), ctrl.update);
router.delete('/:id', verifyToken([]), ctrl.delete);

// ✅ Subida de archivo (campo 'file') → POST /api/gastos/upload
router.post('/upload', verifyToken([]), upload.single('file'), ctrl.upload);

module.exports = router;
