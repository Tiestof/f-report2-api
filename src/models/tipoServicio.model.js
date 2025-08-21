// ===========================================================
// Archivo: models/tipoServicio.model.js
// Descripción: Acceso a BD para tabla TipoServicio
// Nota: Se incorpora 'activado' en todas las operaciones.
// ===========================================================

const db = require('../config/db');

const TipoServicioModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT id_tipo_servicio, descripcion, activado FROM TipoServicio ORDER BY descripcion'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT id_tipo_servicio, descripcion, activado FROM TipoServicio WHERE id_tipo_servicio = ?',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { descripcion, activado } = data;
    const [result] = await db.query(
      'INSERT INTO TipoServicio (descripcion, activado) VALUES (?, COALESCE(?, 1))',
      [descripcion, activado]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { descripcion, activado } = data;
    const [result] = await db.query(
      'UPDATE TipoServicio SET descripcion = COALESCE(?, descripcion), activado = COALESCE(?, activado) WHERE id_tipo_servicio = ?',
      [descripcion, activado, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM TipoServicio WHERE id_tipo_servicio = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoServicioModel;
