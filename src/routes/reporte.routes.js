// ===========================================================
// Archivo: routes/reporte.routes.js
// Descripción: Rutas para el módulo Reporte
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reporte.controller');
const verifyToken = require('../middleware/verifyToken');

// Rutas protegidas con token
router.get('/', verifyToken([]), ctrl.getAll);                  // Obtener todos los reportes
router.get('/:id', verifyToken([]), ctrl.getById);              // Obtener reporte por ID
router.post('/', verifyToken([]), ctrl.create);                 // Crear nuevo reporte
router.put('/:id', verifyToken([]), ctrl.update);               // Actualizar reporte
router.delete('/:id', verifyToken([]), ctrl.delete);            // Eliminar reporte

module.exports = router;
