// ============================================================
// Archivo: src/routes/gastoReporte.routes.js
// Descripción: Rutas para Gastos
// Notas importantes:
//  - El orden de rutas importa: poner /reporte/:idReporte ANTES de /:id
//    para evitar que "reporte" sea capturado como :id.
//  - Los handlers se toman del controller con alias compatibles.
// ============================================================

const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const ctrl = require('../controllers/gastoReporte.controller');

// GET /api/gastos
router.get('/', ctrl.list);

// GET /api/gastos/reporte/:idReporte  (debe ir ANTES de /:id)
router.get('/reporte/:idReporte', ctrl.getByReporte);

// GET /api/gastos/:id
router.get('/:id', ctrl.getById);

// POST /api/gastos
router.post('/', ctrl.create);

// PUT /api/gastos/:id
router.put('/:id', ctrl.update);

// DELETE /api/gastos/:id
router.delete('/:id', ctrl.delete);

// POST /api/gastos/upload  (middleware de archivo -> controller)
router.post('/upload', upload.single('file'), ctrl.upload);

module.exports = router;
