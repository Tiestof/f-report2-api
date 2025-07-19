// ===========================================================
// Archivo: routes/tipoHardware.routes.js
// Descripción: Rutas para el módulo TipoHardware
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tipoHardware.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/tipohardware → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tipohardware/:id → obtener uno por ID
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/tipohardware → crear (solo supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/tipohardware/:id → actualizar (solo supervisor)
router.put('/:id', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/tipohardware/:id → eliminar (solo supervisor)
router.delete('/:id', verifyToken([2]), ctrl.delete);

module.exports = router;
