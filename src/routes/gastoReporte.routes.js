// ===========================================================
// Archivo: routes/gastoReporte.routes.js
// Descripción: Rutas para el módulo GastoReporte
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gastoReporte.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/gastos → listar todos los gastos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/gastos/:id → obtener gasto por ID
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/gastos → crear nuevo gasto (técnico o supervisor)
router.post('/', verifyToken([1, 2]), ctrl.create);

// Ruta: PUT /api/gastos/:id → actualizar gasto (técnico o supervisor)
router.put('/:id', verifyToken([1, 2]), ctrl.update);

// Ruta: DELETE /api/gastos/:id → eliminar gasto (técnico o supervisor)
router.delete('/:id', verifyToken([1, 2]), ctrl.delete);

module.exports = router;
