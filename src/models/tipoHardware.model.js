// ===========================================================
// Archivo: models/tipoHardware.model.js
// Descripción: Acceso a BD para tabla TipoHardware
// Nota: Se incorpora 'activado' en SELECT/INSERT/UPDATE.
// ===========================================================

const db = require('../config/db');

const TipoHardwareModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT id_tipo_hardware, descripcion, activado FROM TipoHardware ORDER BY descripcion'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT id_tipo_hardware, descripcion, activado FROM TipoHardware WHERE id_tipo_hardware = ?',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { descripcion, activado } = data;
    const [result] = await db.query(
      'INSERT INTO TipoHardware (descripcion, activado) VALUES (?, COALESCE(?, 1))',
      [descripcion, activado]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { descripcion, activado } = data;
    const [result] = await db.query(
      'UPDATE TipoHardware SET descripcion = COALESCE(?, descripcion), activado = COALESCE(?, activado) WHERE id_tipo_hardware = ?',
      [descripcion, activado, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM TipoHardware WHERE id_tipo_hardware = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoHardwareModel;
