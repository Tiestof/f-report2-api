/**
 * ============================================================
 * Rutas: src/routes/reportesConsulta.routes.js
 * Propósito:
 *   - Exponer la ruta HTTP para la consulta de reportes con filtros,
 *     paginación y agregados (#evidencias, #gastos).
 *
 * Endpoints:
 *   - GET /api/reportes/consulta
 *
 * Seguridad:
 *   - Protegido con verifyToken([]): admite cualquier usuario ACTIVADO
 *     (técnico o supervisor). Dejamos los roles abiertos según lo acordado.
 *
 * NOTA IMPORTANTE:
 *   - En index.js, monta este router ANTES que reporte.routes (que tiene '/:id'),
 *     o usa un prefijo diferente (p.ej. '/api/reportes-consulta') para evitar
 *     que '/consulta' sea capturado por '/:id'.
 * ============================================================
 */

const express = require('express');
const { getReportesConsultaHandler } = require('../controllers/reportesConsulta.controller');

// ✅ En este proyecto, verifyToken se exporta como función por default
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/**
 * @route   GET /api/reportes/consulta
 * @desc    Consulta de reportes con filtros server-side y paginación
 * @access  Protegido (JWT) - usuarios ACTIVADOS (técnico/supervisor)
 */
router.get('/consulta', verifyToken([]), getReportesConsultaHandler);

module.exports = router;
