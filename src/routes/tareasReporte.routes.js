// ===========================================================
// Archivo: routes/tareasReporte.routes.js
// Descripción: Rutas para el módulo Tareas_Reporte
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tareasReporte.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/tareas → listar todas las tareas de reportes
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tareas/:id → obtener una tarea por ID
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: GET /api/tareas/reporte/:id_reporte → obtener tareas de un reporte específico
router.get('/reporte/:id_reporte', verifyToken([]), ctrl.getByReporte);

// Ruta: POST /api/tareas → crear nueva tarea asociada a un reporte
router.post('/', verifyToken([]), ctrl.create);

// Ruta: PUT /api/tareas/:id → actualizar tarea
router.put('/:id', verifyToken([]), ctrl.update);

// Ruta: DELETE /api/tareas/:id → eliminar tarea
router.delete('/:id', verifyToken([]), ctrl.delete);

module.exports = router;
