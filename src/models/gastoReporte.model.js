// ============================================================
// Archivo: src/models/gastoReporte.model.js
// Descripción: Acceso a BD para tabla GastoReporte
// Cambios:
//  - update() usa COALESCE para soporte parcial (no pisa valores no provistos).
//  - updateImagenUrl() para actualizar solo la URL sin tocar otras columnas.
// ============================================================

const pool = require('../config/db');

const GastoReporteModel = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT gr.*, tg.descripcion AS tipo_gasto
      FROM GastoReporte gr
      LEFT JOIN TipoGasto tg ON gr.id_tipo_gasto = tg.id_tipo_gasto
    `);
    return rows;
  },

  async getById(id_gasto) {
    const [rows] = await pool.query(`
      SELECT gr.*, tg.descripcion AS tipo_gasto
      FROM GastoReporte gr
      LEFT JOIN TipoGasto tg ON gr.id_tipo_gasto = tg.id_tipo_gasto
      WHERE gr.id_gasto = ?
    `, [id_gasto]);
    return rows[0];
  },

  async getByReporte(id_reporte) {
    const [rows] = await pool.query(`
      SELECT gr.*, tg.descripcion AS tipo_gasto
      FROM GastoReporte gr
      LEFT JOIN TipoGasto tg ON gr.id_tipo_gasto = tg.id_tipo_gasto
      WHERE gr.id_reporte = ?
    `, [id_reporte]);
    return rows;
  },

  async create(data) {
    const { id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto } = data;
    const [result] = await pool.query(`
      INSERT INTO GastoReporte (id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id_reporte, id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto]);
    return result.insertId;
  },

  // Actualización parcial: solo columnas provistas
  async update(id_gasto, data) {
    const {
      id_tipo_gasto = null,
      monto = null,
      imagen_url = null,
      comentario = null,
      fecha_gasto = null,
    } = data;

    const [result] = await pool.query(`
      UPDATE GastoReporte
      SET
        id_tipo_gasto = COALESCE(?, id_tipo_gasto),
        monto        = COALESCE(?, monto),
        imagen_url   = COALESCE(?, imagen_url),
        comentario   = COALESCE(?, comentario),
        fecha_gasto  = COALESCE(?, fecha_gasto)
      WHERE id_gasto = ?
    `, [id_tipo_gasto, monto, imagen_url, comentario, fecha_gasto, id_gasto]);

    return result.affectedRows > 0;
  },

  // Actualiza sólo la URL de imagen
  async updateImagenUrl(id_gasto, imagen_url) {
    const [result] = await pool.query(
      'UPDATE GastoReporte SET imagen_url = ? WHERE id_gasto = ?',
      [imagen_url, id_gasto]
    );
    return result.affectedRows > 0;
  },

  async delete(id_gasto) {
    const [result] = await pool.query('DELETE FROM GastoReporte WHERE id_gasto = ?', [id_gasto]);
    return result.affectedRows > 0;
  },
};

module.exports = GastoReporteModel;
