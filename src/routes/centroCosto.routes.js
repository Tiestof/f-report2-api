// ===========================================================
// Archivo: routes/centroCosto.routes.js
// Descripción: Rutas para el módulo CentroCosto
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/centroCosto.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/centrocostos → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/centrocostos/:id → obtener un centro de costo
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/centrocostos → crear centro de costo
router.post('/', verifyToken([]), ctrl.create);

// Ruta: PUT /api/centrocostos/:id → actualizar centro de costo
router.put('/:id', verifyToken([]), ctrl.update);

// Ruta: DELETE /api/centrocostos/:id → eliminar centro de costo
router.delete('/:id', verifyToken([]), ctrl.delete);

module.exports = router;
