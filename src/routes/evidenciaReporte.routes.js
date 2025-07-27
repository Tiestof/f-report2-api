// ===========================================================
// Archivo: routes/evidenciaReporte.routes.js
// Descripción: Rutas para el módulo EvidenciaReporte
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/evidenciaReporte.controller');
const verifyToken = require('../middleware/verifyToken');

// Rutas protegidas con token
router.get('/', verifyToken([]), ctrl.getAll);                     // Listar todas
router.get('/:id', verifyToken([]), ctrl.getById);                 // Obtener una evidencia
router.get('/reporte/:id_reporte', verifyToken([]), ctrl.getByReporte); // Evidencias por reporte
router.post('/', verifyToken([]), ctrl.create);                    // Crear evidencia
router.put('/:id', verifyToken([]), ctrl.update);                  // Actualizar evidencia
router.delete('/:id', verifyToken([]), ctrl.delete);               // Eliminar evidencia

module.exports = router;
