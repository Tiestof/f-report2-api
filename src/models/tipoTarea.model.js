// ===========================================================
// Archivo: models/tipoTarea.model.js
// Descripción: Acceso a BD para tabla TipoTarea
// ===========================================================

const pool = require('../config/db');

const TipoTareaModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM TipoTarea');
    return rows;
  },

  // Obtener un registro por ID
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM TipoTarea WHERE id_tipo_tarea = ?',
      [id]
    );
    return rows[0];
  },

  // Crear nuevo tipo de tarea
  async create(data) {
    const { descripcion_tipo_tarea } = data;
    const [result] = await pool.query(
      'INSERT INTO TipoTarea (descripcion_tipo_tarea) VALUES (?)',
      [descripcion_tipo_tarea]
    );
    return result.insertId;
  },

  // Actualizar tipo de tarea
  async update(id, data) {
    const { descripcion_tipo_tarea } = data;
    const [result] = await pool.query(
      'UPDATE TipoTarea SET descripcion_tipo_tarea = ? WHERE id_tipo_tarea = ?',
      [descripcion_tipo_tarea, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar tipo de tarea
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM TipoTarea WHERE id_tipo_tarea = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoTareaModel;
