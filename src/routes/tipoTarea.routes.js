// ===========================================================
// Archivo: routes/tipoTarea.routes.js
// Descripción: Rutas para el módulo TipoTarea
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tipoTarea.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/tipotareas → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tipotareas/:id → obtener uno
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/tipotareas → crear nuevo tipo de tarea
router.post('/', verifyToken([]), ctrl.create);

// Ruta: PUT /api/tipotareas/:id → actualizar tipo de tarea
router.put('/:id', verifyToken([]), ctrl.update);

// Ruta: DELETE /api/tipotareas/:id → eliminar tipo de tarea
router.delete('/:id', verifyToken([]), ctrl.delete);

module.exports = router;
