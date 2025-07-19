// ===========================================================
// Archivo: models/estadoServicio.model.js
// Descripción: Acceso a BD para tabla EstadoServicio
// ===========================================================

const db = require('../config/db');

const EstadoServicioModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await db.query('SELECT * FROM EstadoServicio');
    return rows;
  },

  // Obtener uno por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM EstadoServicio WHERE id_estado_servicio = ?', [id]);
    return rows[0];
  },

  // Crear nuevo estado
  async create(data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'INSERT INTO EstadoServicio (descripcion) VALUES (?)',
      [descripcion]
    );
    return result.insertId;
  },

  // Actualizar estado existente
  async update(id, data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'UPDATE EstadoServicio SET descripcion = ? WHERE id_estado_servicio = ?',
      [descripcion, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar estado
  async delete(id) {
    const [result] = await db.query('DELETE FROM EstadoServicio WHERE id_estado_servicio = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = EstadoServicioModel;
