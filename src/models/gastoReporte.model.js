// ===========================================================
// Archivo: models/gastoReporte.model.js
// Descripción: Acceso a BD para tabla GastoReporte
// ===========================================================

const db = require('../config/db');

const GastoReporteModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await db.query('SELECT * FROM GastoReporte');
    return rows;
  },

  // Obtener uno por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM GastoReporte WHERE id_gasto = ?', [id]);
    return rows[0];
  },

  // Crear nuevo gasto
  async create(data) {
    const { id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto } = data;
    const [result] = await db.query(
      `INSERT INTO GastoReporte 
        (id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto]
    );
    return result.insertId;
  },

  // Actualizar gasto existente
  async update(id, data) {
    const { id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto } = data;
    const [result] = await db.query(
      `UPDATE GastoReporte SET 
        id_reporte = ?, 
        id_tipo_gasto = ?, 
        monto = ?, 
        imagen_url = ?, 
        comentario = ?, 
        fecha_gasto = ? 
      WHERE id_gasto = ?`,
      [id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar gasto
  async delete(id) {
    const [result] = await db.query('DELETE FROM GastoReporte WHERE id_gasto = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = GastoReporteModel;
