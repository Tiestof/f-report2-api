// ===========================================================
// Archivo: models/auditoria.model.js
// Descripción: Acceso a BD para tabla AuditoriaSistema
// ===========================================================

const pool = require('../config/db');

const AuditoriaModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM AuditoriaSistema ORDER BY fecha_evento DESC');
    return rows;
  },

  // Obtener un registro por ID
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM AuditoriaSistema WHERE id_auditoria = ?', [id]);
    return rows[0];
  },

  // Crear nuevo registro de auditoría
  async create(data) {
    const { tabla_afectada, tipo_evento, rut_operador, descripcion_cambio } = data;
    const [result] = await pool.query(
      `INSERT INTO AuditoriaSistema (tabla_afectada, tipo_evento, rut_operador, descripcion_cambio) 
       VALUES (?, ?, ?, ?)`,
      [tabla_afectada, tipo_evento, rut_operador, descripcion_cambio]
    );
    return result.insertId;
  },

  // Actualizar registro (opcional)
  async update(id, data) {
    const { tabla_afectada, tipo_evento, rut_operador, descripcion_cambio } = data;
    const [result] = await pool.query(
      `UPDATE AuditoriaSistema 
       SET tabla_afectada = ?, tipo_evento = ?, rut_operador = ?, descripcion_cambio = ?
       WHERE id_auditoria = ?`,
      [tabla_afectada, tipo_evento, rut_operador, descripcion_cambio, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar registro (opcional)
  async delete(id) {
    const [result] = await pool.query('DELETE FROM AuditoriaSistema WHERE id_auditoria = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = AuditoriaModel;
