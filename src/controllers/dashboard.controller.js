// ===========================================================
// Archivo: controllers/dashboard.controller.js
// Descripción: Controlador que maneja las consultas para los
// dashboards de Supervisor y Técnico.
// Cada método llama a su respectiva función en el modelo
// Dashboard, manteniendo separación de responsabilidades.
// ===========================================================

const Dashboard = require('../models/dashboard.model');

// 📊 1. Estados de los reportes con conteo y rango de fechas (Supervisor)
exports.getEstadoReportes = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const data = await Dashboard.getEstadoReportes(fechaInicio, fechaFin);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getEstadoReportes:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener estados de reportes' });
  }
};

// 📊 2. Carga de reportes por técnico y por día (Supervisor)
exports.getCargaReportesTecnico = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const data = await Dashboard.getCargaReportesTecnico(fechaInicio, fechaFin);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getCargaReportesTecnico:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener carga de reportes' });
  }
};

// 📊 3. Reportes del día actual (Supervisor)
exports.getReportesHoy = async (req, res) => {
  try {
    const data = await Dashboard.getReportesHoy();
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getReportesHoy:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener reportes del día' });
  }
};

// 📊 4. Técnicos con asignación y disponibles (Supervisor)
exports.getTecnicosDisponibles = async (req, res) => {
  try {
    const data = await Dashboard.getTecnicosDisponibles();
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getTecnicosDisponibles:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener técnicos disponibles' });
  }
};

// 📊 5. Reportes por centro de costo (Supervisor)
exports.getReportesCentroCosto = async (req, res) => {
  try {
    const data = await Dashboard.getReportesCentroCosto();
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getReportesCentroCosto:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener reportes por centro de costo' });
  }
};

// 📊 6. Reportes asignados del día actual (Técnico)
exports.getReportesTecnicoHoy = async (req, res) => {
  try {
    const { rut } = req.params;
    const data = await Dashboard.getReportesTecnicoHoy(rut);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getReportesTecnicoHoy:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener reportes del técnico' });
  }
};

// 📊 7. Historial de reportes del técnico en rango de fechas (Técnico)
exports.getHistorialTecnico = async (req, res) => {
  try {
    const { rut, fechaInicio, fechaFin } = req.query;
    const data = await Dashboard.getHistorialTecnico(rut, fechaInicio, fechaFin);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getHistorialTecnico:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener historial de reportes' });
  }
};

// 📊 8. Estados de reportes del técnico (Técnico)
exports.getEstadoReportesTecnico = async (req, res) => {
  try {
    const { rut } = req.params;
    const data = await Dashboard.getEstadoReportesTecnico(rut);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getEstadoReportesTecnico:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener estados de reportes del técnico' });
  }
};

// 📊 9. Programación de la semana actual (Técnico)
exports.getProgramacionSemana = async (req, res) => {
  try {
    const { rut } = req.params;
    const data = await Dashboard.getProgramacionSemana(rut);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getProgramacionSemana:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener programación de la semana' });
  }
};
