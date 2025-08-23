// ===========================================================
// Archivo: routes/dashboard.routes.js
// Descripción: Rutas para consultas de dashboards de Supervisor y Técnico.
// Todas las rutas están protegidas con JWT usando verifyToken.
// ===========================================================

const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const verifyToken = require('../middleware/verifyToken'); // Middleware de autenticación JWT

// -------------------------------
// Rutas Dashboard Supervisor
// -------------------------------

// 1) Estados de reportes por rango de fechas
// Ej: GET /api/dashboard/supervisor/estado-reportes?fechaInicio=2025-07-01&fechaFin=2025-07-31
router.get('/supervisor/estado-reportes', verifyToken([2]), DashboardController.getEstadoReportes);

// 2) Carga de reportes por técnico y por día
// Ej: GET /api/dashboard/supervisor/carga-reportes?fechaInicio=2025-07-01&fechaFin=2025-07-31
router.get('/supervisor/carga-reportes', verifyToken([2]), DashboardController.getCargaReportesTecnico);

// ✅ NUEVO: 2b) Carga de reportes por técnico + estado
// Ej: GET /api/dashboard/supervisor/carga-reportes-estado?fechaInicio=2025-08-01&fechaFin=2025-08-31
router.get(
  '/supervisor/carga-reportes-estado',
  verifyToken([2]),
  DashboardController.getCargaReportesTecnicoEstado
);

// 3) Reportes totales del día actual
// Ej: GET /api/dashboard/supervisor/reportes-hoy
router.get('/supervisor/reportes-hoy', verifyToken([2]), DashboardController.getReportesHoy);

// 4) Técnicos asignados vs disponibles (día actual)
// Ej: GET /api/dashboard/supervisor/tecnicos-disponibles
router.get('/supervisor/tecnicos-disponibles', verifyToken([2]), DashboardController.getTecnicosDisponibles);

// 5) Cantidad de reportes por centro de costo
// Ej: GET /api/dashboard/supervisor/reportes-centro-costo
router.get('/supervisor/reportes-centro-costo', verifyToken([2]), DashboardController.getReportesCentroCosto);

// -------------------------------
// Rutas Dashboard Técnico
// -------------------------------

// 6) Reportes asignados del día actual para un técnico específico
// Ej: GET /api/dashboard/tecnico/reportes-hoy/:rut
router.get('/tecnico/reportes-hoy/:rut', verifyToken([]), DashboardController.getReportesTecnicoHoy);

module.exports = router;
