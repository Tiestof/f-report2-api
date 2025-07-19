// ===========================================================
// Archivo: routes/cliente.routes.js
// Descripción: Rutas para módulo Cliente
// ===========================================================

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cliente.controller');
const verifyToken = require('../middleware/verifyToken');

// Ruta: GET /api/clientes → lista completa (todos los usuarios autenticados)
router.get('/', verifyToken([]), ctrl.getAll);

// Ruta: GET /api/clientes/:rut_cliente → obtener un cliente (todos los usuarios autenticados)
router.get('/:rut_cliente', verifyToken([]), ctrl.getById);

// Ruta: POST /api/clientes → crear cliente (solo supervisor)
router.post('/', verifyToken([2]), ctrl.create);

// Ruta: PUT /api/clientes/:rut_cliente → actualizar cliente (solo supervisor)
router.put('/:rut_cliente', verifyToken([2]), ctrl.update);

// Ruta: DELETE /api/clientes/:rut_cliente → eliminar cliente (solo supervisor)
router.delete('/:rut_cliente', verifyToken([2]), ctrl.delete);

module.exports = router;