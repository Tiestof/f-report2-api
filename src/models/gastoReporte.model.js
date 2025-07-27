// ===========================================================
// Archivo: gastoReporte.model.js
// Descripción: Acceso a BD para tabla GastoReporte
// ===========================================================

const pool = require('../config/db');

const GastoReporteModel = {
  // Obtener todos los gastos
  async getAll() {
    const [rows] = await pool.query(`
      SELECT gr.*, tg.descripcion AS tipo_gasto
      FROM GastoReporte gr
      LEFT JOIN TipoGasto tg ON gr.id_tipo_gasto = tg.id_tipo_gasto
    `);
    return rows;
  },

  // Obtener gastos por ID de gasto
  async getById(id_gasto) {
    const [rows] = await pool.query(`
      SELECT gr.*, tg.descripcion AS tipo_gasto
      FROM GastoReporte gr
      LEFT JOIN TipoGasto tg ON gr.id_tipo_gasto = tg.id_tipo_gasto
      WHERE gr.id_gasto = ?
    `, [id_gasto]);
    return rows[0];
  },

  // Obtener gastos asociados a un reporte específico
  async getByReporte(id_reporte) {
    const [rows] = await pool.query(`
      SELECT gr.*, tg.descripcion AS tipo_gasto
      FROM GastoReporte gr
      LEFT JOIN TipoGasto tg ON gr.id_tipo_gasto = tg.id_tipo_gasto
      WHERE gr.id_reporte = ?
    `, [id_reporte]);
    return rows;
  },

  // Crear nuevo gasto asociado a un reporte
  async create(data) {
    const { id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto } = data;
    const [result] = await pool.query(`
      INSERT INTO GastoReporte (id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto]);
    return result.insertId;
  },

  // Actualizar gasto
  async update(id_gasto, data) {
    const { id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto } = data;
    const [result] = await pool.query(`
      UPDATE GastoReporte 
      SET id_tipo_gasto = ?, monto = ?, imagen_url = ?, comentario = ?, fecha_gasto = ?
      WHERE id_gasto = ?
    `, [id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto, id_gasto]);
    return result.affectedRows > 0;
  },

  // Eliminar gasto
  async delete(id_gasto) {
    const [result] = await pool.query('DELETE FROM GastoReporte WHERE id_gasto = ?', [id_gasto]);
    return result.affectedRows > 0;
  }
};

module.exports = GastoReporteModel;
