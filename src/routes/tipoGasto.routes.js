// ===========================================================
// Archivo: routes/tipoGasto.routes.js
// Descripción: Rutas para el módulo TipoGasto
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tipoGasto.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/tipogastos → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tipogastos/:id → obtener uno
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/tipogastos → crear (solo supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/tipogastos/:id → actualizar (solo supervisor)
router.put('/:id', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/tipogastos/:id → eliminar (solo supervisor)
router.delete('/:id', verifyToken([2]), ctrl.delete);

module.exports = router;
