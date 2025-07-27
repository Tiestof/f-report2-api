// ===========================================================
// Archivo: routes/auditoria.routes.js
// Descripción: Rutas para el módulo AuditoriaSistema
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auditoria.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/auditoria → listar todos los registros de auditoría
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/auditoria/:id → obtener un registro por ID
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/auditoria → crear nuevo registro de auditoría
router.post('/', verifyToken([]), ctrl.create);

// Ruta: PUT /api/auditoria/:id → actualizar registro (opcional)
router.put('/:id', verifyToken([]), ctrl.update);

// Ruta: DELETE /api/auditoria/:id → eliminar registro (opcional)
router.delete('/:id', verifyToken([]), ctrl.delete);

module.exports = router;
