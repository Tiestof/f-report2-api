// ===========================================================
// Archivo: models/tipoServicio.model.js
// Descripción: Acceso a BD para tabla TipoServicio
// ===========================================================

const db = require('../config/db');

const TipoServicioModel = {
  // Obtener todos
  async getAll() {
    const [rows] = await db.query('SELECT * FROM TipoServicio');
    return rows;
  },

  // Obtener por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM TipoServicio WHERE id_tipo_servicio = ?', [id]);
    return rows[0];
  },

  // Crear nuevo
  async create(data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'INSERT INTO TipoServicio (descripcion) VALUES (?)',
      [descripcion]
    );
    return result.insertId;
  },

  // Actualizar
  async update(id, data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'UPDATE TipoServicio SET descripcion = ? WHERE id_tipo_servicio = ?',
      [descripcion, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar
  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM TipoServicio WHERE id_tipo_servicio = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoServicioModel;
