// ===========================================================
// Archivo: models/tipoEvidencia.model.js
// Descripción: Acceso a BD para tabla TipoEvidencia
// Nota: Se incorpora 'activado'.
// ===========================================================

const db = require('../config/db');

const TipoEvidenciaModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT id_tipo_evidencia, descripcion_tipo_evidencia, activado FROM TipoEvidencia ORDER BY descripcion_tipo_evidencia'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT id_tipo_evidencia, descripcion_tipo_evidencia, activado FROM TipoEvidencia WHERE id_tipo_evidencia = ?',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { descripcion_tipo_evidencia, activado } = data;
    const [result] = await db.query(
      'INSERT INTO TipoEvidencia (descripcion_tipo_evidencia, activado) VALUES (?, COALESCE(?, 1))',
      [descripcion_tipo_evidencia, activado]
    );
    return result.insertId;
  },

  async update(id, data) {
    const { descripcion_tipo_evidencia, activado } = data;
    const [result] = await db.query(
      'UPDATE TipoEvidencia SET descripcion_tipo_evidencia = COALESCE(?, descripcion_tipo_evidencia), activado = COALESCE(?, activado) WHERE id_tipo_evidencia = ?',
      [descripcion_tipo_evidencia, activado, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM TipoEvidencia WHERE id_tipo_evidencia = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoEvidenciaModel;
