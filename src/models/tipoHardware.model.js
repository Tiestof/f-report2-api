// ===========================================================
// Archivo: models/tipoHardware.model.js
// Descripción: Acceso a BD para tabla TipoHardware
// ===========================================================

const db = require('../config/db');

const TipoHardwareModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await db.query('SELECT * FROM TipoHardware');
    return rows;
  },

  // Obtener uno por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM TipoHardware WHERE id_tipo_hardware = ?', [id]);
    return rows[0];
  },

  // Crear nuevo registro
  async create(data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'INSERT INTO TipoHardware (descripcion) VALUES (?)',
      [descripcion]
    );
    return result.insertId;
  },

  // Actualizar existente por ID
  async update(id, data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'UPDATE TipoHardware SET descripcion = ? WHERE id_tipo_hardware = ?',
      [descripcion, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar por ID
  async delete(id) {
    const [result] = await db.query('DELETE FROM TipoHardware WHERE id_tipo_hardware = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = TipoHardwareModel;
