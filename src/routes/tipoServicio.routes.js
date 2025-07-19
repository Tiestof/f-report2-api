// ===========================================================
// Archivo: routes/tipoServicio.routes.js
// Descripción: Rutas para el módulo TipoServicio
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tipoServicio.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/tiposervicios → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tiposervicios/:id → obtener uno
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/tiposervicios → crear (solo supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/tiposervicios/:id → actualizar (solo supervisor)
router.put('/:id', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/tiposervicios/:id → eliminar (solo supervisor)
router.delete('/:id', verifyToken([2]), ctrl.delete);

module.exports = router;
