// ===========================================================
// Archivo: models/dashboard.model.js
// Descripción: Consultas SQL para dashboards de Supervisor y Técnico.
// Todas las funciones retornan datos listos para consumir en el controlador.
// ===========================================================

const pool = require('../config/db');

const Dashboard = {
  // 📊 1. Estados de los reportes por rango de fechas (Supervisor)
  // Devuelve la cantidad de reportes agrupados por estado dentro del rango indicado.
  async getEstadoReportes(fechaInicio, fechaFin) {
    const [rows] = await pool.query(`
      SELECT es.descripcion AS estado,
             COUNT(r.id_reporte) AS cantidad
      FROM Reporte r
      INNER JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
      WHERE r.fecha_reporte BETWEEN ? AND ?
      GROUP BY es.descripcion
    `, [fechaInicio, fechaFin]);
    return rows;
  },

  // 📊 2. Carga de reportes por técnico y día (Supervisor)
  // Cuenta reportes realizados por cada técnico agrupados por fecha.
  async getCargaReportesTecnico(fechaInicio, fechaFin) {
    const [rows] = await pool.query(`
      SELECT u.nombre, r.fecha_reporte, COUNT(r.id_reporte) AS total
      FROM Reporte r
      INNER JOIN Usuario u ON r.rut_usuario = u.rut
      WHERE r.fecha_reporte BETWEEN ? AND ?
      GROUP BY u.nombre, r.fecha_reporte
      ORDER BY r.fecha_reporte ASC
    `, [fechaInicio, fechaFin]);
    return rows;
  },

  // 📊 3. Reportes del día actual (Supervisor)
  // Devuelve el total de reportes con fecha de hoy.
  async getReportesHoy() {
    const [rows] = await pool.query(`
      SELECT COUNT(*) AS total_hoy
      FROM Reporte
      WHERE DATE(fecha_reporte) = CURDATE()
    `);
    return rows[0];
  },

  // 📊 4. Técnicos con asignación y disponibles (Supervisor)
  // Lista todos los técnicos, muestra si tienen reporte asignado para hoy o están libres.
  async getTecnicosDisponibles() {
    const [rows] = await pool.query(`
      SELECT u.rut, u.nombre,
             r.id_reporte, r.fecha_reporte, r.hora_inicio, c.nombre_cliente,
             CASE WHEN r.id_reporte IS NULL THEN 'Disponible' ELSE 'Asignado' END AS estado
      FROM Usuario u
      LEFT JOIN Reporte r ON u.rut = r.rut_usuario AND r.fecha_reporte = CURDATE()
      LEFT JOIN Cliente c ON r.rut_cliente = c.rut_cliente
      WHERE u.id_tipo_usuario = 1; -- 1 = Técnico
    `);
    return rows;
  },

  // 📊 5. Reportes por centro de costo (Supervisor)
  // Cuenta reportes asociados a cada centro de costo.
  async getReportesCentroCosto() {
    const [rows] = await pool.query(`
      SELECT cc.nombre_centro_costo, COUNT(r.id_reporte) AS total
      FROM Reporte r
      INNER JOIN CentroCosto cc ON r.id_rut_empresa_cobro = cc.id_rut_empresa_cobro
      GROUP BY cc.nombre_centro_costo
    `);
    return rows;
  },

  // 📊 6. Reportes asignados del día actual para un técnico (Técnico)
  // Muestra datos clave de los reportes que tiene el técnico hoy.
  async getReportesTecnicoHoy(rut) {
    const [rows] = await pool.query(`
      SELECT r.id_reporte, r.direccion, r.hora_inicio, c.nombre_cliente, es.descripcion AS estado
      FROM Reporte r
      INNER JOIN Cliente c ON r.rut_cliente = c.rut_cliente
      INNER JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
      WHERE r.rut_usuario = ? AND DATE(r.fecha_reporte) = CURDATE()
    `, [rut]);
    return rows;
  },

  // 📊 7. Historial de reportes de un técnico en un rango de fechas (Técnico)
  // Devuelve los reportes que el técnico ha realizado entre dos fechas.
  async getHistorialTecnico(rut, fechaInicio, fechaFin) {
    const [rows] = await pool.query(`
      SELECT r.id_reporte, r.fecha_reporte, r.direccion, es.descripcion AS estado
      FROM Reporte r
      INNER JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
      WHERE r.rut_usuario = ? AND r.fecha_reporte BETWEEN ? AND ?
    `, [rut, fechaInicio, fechaFin]);
    return rows;
  },

  // 📊 8. Estados de reportes de un técnico (Técnico)
  // Cuenta los reportes del técnico agrupados por estado.
  async getEstadoReportesTecnico(rut) {
    const [rows] = await pool.query(`
      SELECT es.descripcion AS estado, COUNT(r.id_reporte) AS cantidad
      FROM Reporte r
      INNER JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
      WHERE r.rut_usuario = ?
      GROUP BY es.descripcion
    `, [rut]);
    return rows;
  },

  // 📊 9. Programación de la semana actual (Técnico)
  // Lista los reportes asignados al técnico para los próximos 7 días.
  async getProgramacionSemana(rut) {
    const [rows] = await pool.query(`
      SELECT r.id_reporte, r.fecha_reporte, r.direccion, r.hora_inicio, c.nombre_cliente
      FROM Reporte r
      INNER JOIN Cliente c ON r.rut_cliente = c.rut_cliente
      WHERE r.rut_usuario = ?
      AND r.fecha_reporte BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
    `, [rut]);
    return rows;
  }
};

module.exports = Dashboard;
