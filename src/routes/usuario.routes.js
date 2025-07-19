// ===========================================================
// Archivo: routes/usuario.routes.js
// Descripción: Rutas para módulo de usuarios
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuario.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/usuarios/perfil → autenticado
router.get('/perfil', verifyToken([]), ctrl.perfil);

// Ruta: GET /api/usuarios → listado completo (solo supervisor)
router.get('/', verifyToken([2]), ctrl.getAll);

// Ruta: POST /api/usuarios → crear usuario (solo supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/usuarios/:rut → actualizar usuario (solo supervisor)
router.put('/:rut', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/usuarios/:rut → eliminar usuario (solo supervisor)
router.delete('/:rut', verifyToken([2]), ctrl.delete);

module.exports = router;
