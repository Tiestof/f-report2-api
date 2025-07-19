// ================================================
// Archivo: auth.routes.js
// Descripción: Ruta para login
// ================================================

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

// Ruta: POST /api/auth/login
router.post('/login', authCtrl.login);

module.exports = router;
