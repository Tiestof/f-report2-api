// ===========================================================
// Archivo: models/tipoTarea.model.js
// Descripción: Acceso a BD para tabla TipoTarea
// Nota: Se incorpora 'activado'.
// ===========================================================

const pool = require('../config/db');

const TipoTareaModel = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_tipo_tarea, descripcion_tipo_tarea, activado FROM TipoTarea ORDER BY descripcion_tipo_tarea'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_tipo_tarea, descripcion_tipo_tarea, activado FROM TipoTarea WHERE id_tipo_tarea = ?',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { descripcion_tipo_tarea, activado } = data;
    const [result] = await pool.query(
      'INSERT INTO TipoTarea (descripcion_tipo_tarea, activado) VALUES (?, COALESCE(?, 1))',
      [descripcion_tipo_tarea, activado]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { descripcion_tipo_tarea, activado } = data;
    const [result] = await pool.query(
      'UPDATE TipoTarea SET descripcion_tipo_tarea = COALESCE(?, descripcion_tipo_tarea), activado = COALESCE(?, activado) WHERE id_tipo_tarea = ?',
      [descripcion_tipo_tarea, activado, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM TipoTarea WHERE id_tipo_tarea = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoTareaModel;
