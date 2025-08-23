// ===========================================================
// Archivo: controllers/dashboard.controller.js
// Descripción: Controlador que maneja las consultas para los
// dashboards de Supervisor y Técnico.
// Cada método llama a su respectiva función en el modelo Dashboard.
// ===========================================================

const Dashboard = require('../models/dashboard.model');

// 📊 1) Estados de los reportes por rango (Supervisor)
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

// 📊 2) Carga de reportes por técnico y por día (Supervisor)
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

// ✅ NUEVO: 📊 2b) Carga de reportes por técnico + estado (Supervisor)
exports.getCargaReportesTecnicoEstado = async (req, res) => {
  try {
    let { fechaInicio, fechaFin } = req.query;

    // Defaults: últimos 7 días si no vienen
    if (!fechaInicio || !fechaFin) {
      const today = new Date();
      const fin = today.toISOString().slice(0, 10);
      const iniDate = new Date();
      iniDate.setDate(today.getDate() - 6);
      const ini = iniDate.toISOString().slice(0, 10);
      fechaInicio = fechaInicio || ini;
      fechaFin = fechaFin || fin;
    }

    const data = await Dashboard.getCargaReportesTecnicoEstado(fechaInicio, fechaFin);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getCargaReportesTecnicoEstado:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener carga por técnico y estado' });
  }
};

// 📊 3) Reportes del día actual (Supervisor)
exports.getReportesHoy = async (_req, res) => {
  try {
    const data = await Dashboard.getReportesHoy();
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getReportesHoy:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener reportes del día' });
  }
};

// 📊 4) Técnicos asignados vs disponibles (día actual)
exports.getTecnicosDisponibles = async (_req, res) => {
  try {
    const data = await Dashboard.getTecnicosDisponibles();
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getTecnicosDisponibles:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener técnicos' });
  }
};

// 📊 5) Reportes por centro de costo (Supervisor)
exports.getReportesCentroCosto = async (_req, res) => {
  try {
    const data = await Dashboard.getReportesCentroCosto();
    res.json(data);
  } catch (err) {
    console.error('❌ Error en getReportesCentroCosto:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener reportes por centro de costo' });
  }
};

// 📊 6) Reportes del día actual por técnico específico (Técnico)
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
