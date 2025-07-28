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

// 1. Estados de reportes por rango de fechas
// Ejemplo: GET /api/dashboard/supervisor/estado-reportes?fechaInicio=2025-07-01&fechaFin=2025-07-31
router.get('/supervisor/estado-reportes', verifyToken([2]), DashboardController.getEstadoReportes);

// 2. Carga de reportes por técnico y por día
// Ejemplo: GET /api/dashboard/supervisor/carga-reportes?fechaInicio=2025-07-01&fechaFin=2025-07-31
router.get('/supervisor/carga-reportes', verifyToken([2]), DashboardController.getCargaReportesTecnico);

// 3. Reportes totales del día actual
// Ejemplo: GET /api/dashboard/supervisor/reportes-hoy
router.get('/supervisor/reportes-hoy', verifyToken([2]), DashboardController.getReportesHoy);

// 4. Técnicos asignados vs disponibles (día actual)
// Ejemplo: GET /api/dashboard/supervisor/tecnicos-disponibles
router.get('/supervisor/tecnicos-disponibles', verifyToken([2]), DashboardController.getTecnicosDisponibles);

// 5. Cantidad de reportes por centro de costo
// Ejemplo: GET /api/dashboard/supervisor/reportes-centro-costo
router.get('/supervisor/reportes-centro-costo', verifyToken([2]), DashboardController.getReportesCentroCosto);

// -------------------------------
// Rutas Dashboard Técnico
// -------------------------------

// 6. Reportes asignados del día actual para un técnico específico
// Ejemplo: GET /api/dashboard/tecnico/reportes-hoy/166407320
router.get('/tecnico/reportes-hoy/:rut', verifyToken([]), DashboardController.getReportesTecnicoHoy);

// 7. Historial de reportes de un técnico en rango de fechas
// Ejemplo: GET /api/dashboard/tecnico/historial?rut=166407320&fechaInicio=2025-07-01&fechaFin=2025-07-31
router.get('/tecnico/historial', verifyToken([]), DashboardController.getHistorialTecnico);

// 8. Estados de reportes actuales del técnico
// Ejemplo: GET /api/dashboard/tecnico/estado/166407320
router.get('/tecnico/estado/:rut', verifyToken([]), DashboardController.getEstadoReportesTecnico);

// 9. Programación de la semana actual (7 días)
router.get('/tecnico/semana/:rut', verifyToken([]), DashboardController.getProgramacionSemana);

module.exports = router;
