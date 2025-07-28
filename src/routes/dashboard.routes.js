// ===========================================================
// Archivo: routes/dashboard.routes.js
// Descripción: Define rutas para las consultas de dashboard.
// ===========================================================

const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const verifyToken = require('../middleware/verifyToken');

// 🛡️ Todas las rutas protegidas con JWT
// ---- Supervisor ----
router.get('/supervisor/estado-reportes', verifyToken([2]), DashboardController.getEstadoReportes);
router.get('/supervisor/carga-reportes', verifyToken([2]), DashboardController.getCargaReportesTecnico);
router.get('/supervisor/reportes-hoy', verifyToken([2]), DashboardController.getReportesHoy);
router.get('/supervisor/tecnicos-disponibles', verifyToken([2]), DashboardController.getTecnicosDisponibles);
router.get('/supervisor/reportes-centro-costo', verifyToken([2]), DashboardController.getReportesCentroCosto);

// ---- Técnico ----
router.get('/tecnico/reportes-hoy/:rut', verifyToken([1]), DashboardController.getReportesTecnicoHoy);
router.get('/tecnico/historial', verifyToken([1]), DashboardController.getHistorialTecnico);
router.get('/tecnico/estado/:rut', verifyToken([1]), DashboardController.getEstadoReportesTecnico);
router.get('/tecnico/semana/:rut', verifyToken([1]), DashboardController.getProgramacionSemana);

module.exports = router;
