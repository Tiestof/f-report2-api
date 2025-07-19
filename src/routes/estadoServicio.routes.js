// ===========================================================
// Archivo: routes/estadoServicio.routes.js
// Descripción: Rutas para el módulo EstadoServicio
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estadoServicio.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/estadoservicios → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/estadoservicios/:id → obtener uno
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/estadoservicios → crear (solo supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/estadoservicios/:id → actualizar (solo supervisor)
router.put('/:id', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/estadoservicios/:id → eliminar (solo supervisor)
router.delete('/:id', verifyToken([2]), ctrl.delete);

module.exports = router;
