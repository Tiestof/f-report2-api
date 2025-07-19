// ================================================
// Archivo: tipoUsuario.routes.js
// Descripción: Define las rutas para CRUD de TipoUsuario
// ================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tipoUsuario.controller');
const verifyToken = require('../middleware/verifyToken'); // Asegúrate que el middleware exista

// Ruta: GET /api/tipousuarios → obtener todos (cualquier usuario autenticado)
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/tipousuarios/:id → obtener uno (cualquier usuario autenticado)
router.get('/:id', verifyToken([]), ctrl.getById);

// Ruta: POST /api/tipousuarios → crear nuevo (solo Supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/tipousuarios/:id → actualizar (solo Supervisor)
router.put('/:id', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/tipousuarios/:id → eliminar (solo Supervisor)
router.delete('/:id', verifyToken([2]), ctrl.delete);

module.exports = router;

