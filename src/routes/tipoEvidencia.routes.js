// ===========================================================
// Archivo: routes/tipoEvidencia.routes.js
// Descripción: Rutas para el módulo TipoEvidencia
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tipoEvidencia.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/tipoevidencias → listar todos
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tipoevidencias/:id → obtener uno
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/tipoevidencias → crear tipo de evidencia
router.post('/', verifyToken([]), ctrl.create);

// Ruta: PUT /api/tipoevidencias/:id → actualizar tipo de evidencia
router.put('/:id', verifyToken([]), ctrl.update);

// Ruta: DELETE /api/tipoevidencias/:id → eliminar tipo de evidencia
router.delete('/:id', verifyToken([]), ctrl.delete);

module.exports = router;
