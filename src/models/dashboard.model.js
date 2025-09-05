// ===========================================================
// Archivo: models/dashboard.model.js
// Descripción: Consultas SQL para dashboards de Supervisor y Técnico.
// Todas las funciones retornan datos listos para consumir en el controlador.
// ===========================================================

const pool = require('../config/db');

const Dashboard = {
  // ---------------------------------------------------------
  // 📊 1) Estados de los reportes por rango de fechas (Supervisor)
  // Devuelve la cantidad de reportes agrupados por estado dentro del rango indicado.
  // Usado por: GET /api/dashboard/supervisor/estado-reportes
  // ---------------------------------------------------------
  async getEstadoReportes(fechaInicio, fechaFin) {
    const [rows] = await pool.query(
      `
      SELECT es.descripcion AS estado,
             COUNT(r.id_reporte) AS cantidad
      FROM Reporte r
      INNER JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
      WHERE r.fecha_reporte BETWEEN ? AND ?
      GROUP BY es.descripcion
      `,
      [fechaInicio, fechaFin]
    );
    return rows;
  },

  // ---------------------------------------------------------
  // 📊 2) Carga de reportes por técnico y por día (Supervisor)
  // Cuenta reportes realizados por cada técnico, agrupados por fecha.
  // Usado por: GET /api/dashboard/supervisor/carga-reportes
  // ---------------------------------------------------------
  async getCargaReportesTecnico(fechaInicio, fechaFin) {
    const [rows] = await pool.query(
      `
      SELECT u.nombre, r.fecha_reporte, COUNT(r.id_reporte) AS total
      FROM Reporte r
      INNER JOIN Usuario u ON r.rut_usuario = u.rut
      WHERE r.fecha_reporte BETWEEN ? AND ?
      GROUP BY u.nombre, r.fecha_reporte
      ORDER BY r.fecha_reporte ASC
      `,
      [fechaInicio, fechaFin]
    );
    return rows;
  },

  // ---------------------------------------------------------
  // ✅ NUEVO: 2b) Carga de reportes por técnico + estado (Supervisor)
  // Agrega totales por técnico y por estado dentro del rango indicado.
  // Usado por: GET /api/dashboard/supervisor/carga-reportes-estado
  // ---------------------------------------------------------
  async getCargaReportesTecnicoEstado(fechaInicio, fechaFin) {
    const [rows] = await pool.query(
      `
      SELECT 
        u.rut,
        u.nombre,
        es.descripcion AS estado,
        COUNT(r.id_reporte) AS total
      FROM Reporte r
      INNER JOIN Usuario u
        ON u.rut = r.rut_usuario
      INNER JOIN EstadoServicio es
        ON es.id_estado_servicio = r.id_estado_servicio
      WHERE r.fecha_reporte BETWEEN ? AND ?
      GROUP BY u.rut, u.nombre, es.descripcion
      ORDER BY u.nombre ASC, total DESC
      `,
      [fechaInicio, fechaFin]
    );
    return rows;
  },

  // ---------------------------------------------------------
  // 📊 3) Reportes del día actual (Supervisor)
  // Devuelve el total de reportes con fecha de hoy.
  // Usado por: GET /api/dashboard/supervisor/reportes-hoy
  // ---------------------------------------------------------
  async getReportesHoy() {
    const [rows] = await pool.query(
      `
      SELECT COUNT(*) AS total_hoy
      FROM Reporte
      WHERE DATE(fecha_reporte) = CURDATE()
      `
    );
    return rows[0];
  },

  // ---------------------------------------------------------
  // 📊 4) Técnicos con asignación y disponibles (Supervisor)
  // Lista técnicos indicando si hoy tienen un reporte asignado.
  // Usado por: GET /api/dashboard/supervisor/tecnicos-disponibles
  // ---------------------------------------------------------
  async getTecnicosDisponibles() {
    const [rows] = await pool.query(
      `
      SELECT 
        u.rut, 
        u.nombre,
        r.id_reporte, 
        r.fecha_reporte, 
        r.hora_inicio, 
        c.nombre_cliente,
        CASE WHEN r.id_reporte IS NULL THEN 'Disponible' ELSE 'Asignado' END AS estado
      FROM Usuario u
      LEFT JOIN Reporte r 
        ON u.rut = r.rut_usuario 
       AND DATE(r.fecha_reporte) = CURDATE()
      LEFT JOIN Cliente c 
        ON r.rut_cliente = c.rut_cliente
      WHERE u.id_tipo_usuario = 1; -- 1 = Técnico
      `
    );
    return rows;
  },

  // ---------------------------------------------------------
  // 📊 5) Reportes por centro de costo (Supervisor)
  // Usado por: GET /api/dashboard/supervisor/reportes-centro-costo
  // ---------------------------------------------------------
  async getReportesCentroCosto() {
    const [rows] = await pool.query(
      `
      SELECT cc.nombre_centro_costo, COUNT(r.id_reporte) AS total
      FROM Reporte r
      INNER JOIN CentroCosto cc ON r.id_rut_empresa_cobro = cc.id_rut_empresa_cobro
      GROUP BY cc.nombre_centro_costo
      `
    );
    return rows;
  },

  // ---------------------------------------------------------
  // 👷 6) Reportes del día actual por técnico (Técnico)
  // Considera asignación como ejecutor (rut_usuario) o responsable (rut_responsable).
  // Devuelve además info útil para UI (cliente, estado, tipo_servicio).
  // Usado por: GET /api/dashboard/tecnico/reportes-hoy/:rut
  // ---------------------------------------------------------
  async getReportesTecnicoHoy(rut) {
    const [rows] = await pool.query(
      `
      SELECT 
        r.*,
        c.nombre_cliente,
        es.descripcion  AS estado_servicio,
        ts.descripcion  AS tipo_servicio
      FROM Reporte r
      LEFT JOIN Cliente        c  ON c.rut_cliente           = r.rut_cliente
      LEFT JOIN EstadoServicio es ON es.id_estado_servicio   = r.id_estado_servicio
      LEFT JOIN TipoServicio   ts ON ts.id_tipo_servicio     = r.id_tipo_servicio
      WHERE (r.rut_usuario = ? OR r.rut_responsable = ?)
        AND DATE(r.fecha_reporte) = CURDATE()
      ORDER BY r.hora_inicio ASC, r.id_reporte ASC
      `,
      [rut, rut]
    );
    return rows;
  },

  // ---------------------------------------------------------
  // 👷 7) Próximos del técnico desde HOY hasta el PRÓXIMO VIERNES (incl.)
  // Útil para el resumen semanal del dashboard del técnico.
  // (No rompe nada existente; crea un endpoint nuevo si lo deseas.)
  // ---------------------------------------------------------
  async getProximosTecnicoHastaViernes(rut) {
    // Cálculo de próximo viernes (MySQL): Friday = 6 en DAYOFWEEK (1=Domingo).
    // days_to_friday = (6 - DAYOFWEEK(CURDATE()) + 7) % 7
    const [rows] = await pool.query(
      `
      SELECT 
        r.*,
        c.nombre_cliente,
        es.descripcion  AS estado_servicio,
        ts.descripcion  AS tipo_servicio
      FROM Reporte r
      LEFT JOIN Cliente        c  ON c.rut_cliente           = r.rut_cliente
      LEFT JOIN EstadoServicio es ON es.id_estado_servicio   = r.id_estado_servicio
      LEFT JOIN TipoServicio   ts ON ts.id_tipo_servicio     = r.id_tipo_servicio
      WHERE (r.rut_usuario = ? OR r.rut_responsable = ?)
        AND r.fecha_reporte BETWEEN CURDATE()
                                AND DATE_ADD(CURDATE(), INTERVAL MOD(6 - DAYOFWEEK(CURDATE()) + 7, 7) DAY)
      ORDER BY r.fecha_reporte ASC, r.hora_inicio ASC, r.id_reporte ASC
      `,
      [rut, rut]
    );
    return rows;
  },

  // ---------------------------------------------------------
  // 👷 8) Estados por rango para un técnico (responsable/usuario)
  // Pensado para "últimos 31 días" en el dashboard del técnico.
  // ---------------------------------------------------------
  async getEstadosTecnico31d(rut, fechaInicio, fechaFin) {
    const [rows] = await pool.query(
      `
      SELECT 
        es.descripcion AS estado,
        COUNT(r.id_reporte) AS total
      FROM Reporte r
      INNER JOIN EstadoServicio es ON es.id_estado_servicio = r.id_estado_servicio
      WHERE (r.rut_responsable = ? OR r.rut_usuario = ?)
        AND r.fecha_reporte BETWEEN ? AND ?
      GROUP BY es.descripcion
      ORDER BY total DESC
      `,
      [rut, rut, fechaInicio, fechaFin]
    );
    return rows;
  },
};

module.exports = Dashboard;
