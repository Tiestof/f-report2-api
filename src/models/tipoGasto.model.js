// ===========================================================
// Archivo: models/tipoGasto.model.js
// Descripción: Acceso a BD para tabla TipoGasto
// Nota: Se incorpora 'activado'.
// ===========================================================

const db = require('../config/db');

const TipoGastoModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT id_tipo_gasto, descripcion, activado FROM TipoGasto ORDER BY descripcion'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT id_tipo_gasto, descripcion, activado FROM TipoGasto WHERE id_tipo_gasto = ?',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { descripcion, activado } = data;
    const [result] = await db.query(
      'INSERT INTO TipoGasto (descripcion, activado) VALUES (?, COALESCE(?, 1))',
      [descripcion, activado]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { descripcion, activado } = data;
    const [result] = await db.query(
      'UPDATE TipoGasto SET descripcion = COALESCE(?, descripcion), activado = COALESCE(?, activado) WHERE id_tipo_gasto = ?',
      [descripcion, activado, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM TipoGasto WHERE id_tipo_gasto = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = TipoGastoModel;
