// ===========================================================
// Archivo: models/evidenciaReporte.model.js
// Descripción: Acceso a BD para tabla EvidenciaReporte
// ===========================================================

const pool = require('../config/db');

const EvidenciaReporteModel = {
  // Obtener todas las evidencias
  async getAll() {
    const [rows] = await pool.query(`
      SELECT e.*, te.descripcion_tipo_evidencia
      FROM EvidenciaReporte e
      LEFT JOIN TipoEvidencia te ON e.id_tipo_evidencia = te.id_tipo_evidencia
    `);
    return rows;
  },

  // Obtener evidencia por ID
  async getById(id) {
    const [rows] = await pool.query(`
      SELECT e.*, te.descripcion_tipo_evidencia
      FROM EvidenciaReporte e
      LEFT JOIN TipoEvidencia te ON e.id_tipo_evidencia = te.id_tipo_evidencia
      WHERE e.id_evidencia = ?
    `, [id]);
    return rows[0];
  },

  // Obtener evidencias de un reporte específico
  async getByReporte(id_reporte) {
    const [rows] = await pool.query(`
      SELECT e.*, te.descripcion_tipo_evidencia
      FROM EvidenciaReporte e
      LEFT JOIN TipoEvidencia te ON e.id_tipo_evidencia = te.id_tipo_evidencia
      WHERE e.id_reporte = ?
    `, [id_reporte]);
    return rows;
  },

  // Crear nueva evidencia
  async create(data) {
    const {
      id_reporte, id_tipo_evidencia, id_tarea, url,
      modelo, numero_serie, ipv4, ipv6, macadd, nombre_maquina
    } = data;
    const [result] = await pool.query(`
      INSERT INTO EvidenciaReporte 
        (id_reporte, id_tipo_evidencia, id_tarea, url, modelo, numero_serie, ipv4, ipv6, macadd, nombre_maquina)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id_reporte, id_tipo_evidencia, id_tarea, url, modelo, numero_serie, ipv4, ipv6, macadd, nombre_maquina]);
    return result.insertId;
  },

  // Actualizar evidencia existente
  async update(id_evidencia, data) {
    const {
      id_tipo_evidencia, id_tarea, url,
      modelo, numero_serie, ipv4, ipv6, macadd, nombre_maquina
    } = data;
    const [result] = await pool.query(`
      UPDATE EvidenciaReporte SET 
        id_tipo_evidencia = ?, id_tarea = ?, url = ?, modelo = ?, numero_serie = ?, 
        ipv4 = ?, ipv6 = ?, macadd = ?, nombre_maquina = ?
      WHERE id_evidencia = ?
    `, [id_tipo_evidencia, id_tarea, url, modelo, numero_serie, ipv4, ipv6, macadd, nombre_maquina, id_evidencia]);
    return result.affectedRows > 0;
  },

  // Eliminar evidencia
  async delete(id_evidencia) {
    const [result] = await pool.query('DELETE FROM EvidenciaReporte WHERE id_evidencia = ?', [id_evidencia]);
    return result.affectedRows > 0;
  }
};

module.exports = EvidenciaReporteModel;
