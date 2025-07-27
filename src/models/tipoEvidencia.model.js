// ===========================================================
// Archivo: models/tipoEvidencia.model.js
// Descripción: Acceso a BD para tabla TipoEvidencia
// ===========================================================

const pool = require('../config/db');

const TipoEvidenciaModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM TipoEvidencia');
    return rows;
  },

  // Obtener un registro por ID
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM TipoEvidencia WHERE id_tipo_evidencia = ?',
      [id]
    );
    return rows[0];
  },

  // Crear nuevo tipo de evidencia
  async create(data) {
    const { descripcion_tipo_evidencia } = data;
    const [result] = await pool.query(
      'INSERT INTO TipoEvidencia (descripcion_tipo_evidencia) VALUES (?)',
      [descripcion_tipo_evidencia]
    );
    return result.insertId;
  },

  // Actualizar tipo de evidencia existente
  async update(id, data) {
    const { descripcion_tipo_evidencia } = data;
    const [result] = await pool.query(
      'UPDATE TipoEvidencia SET descripcion_tipo_evidencia = ? WHERE id_tipo_evidencia = ?',
      [descripcion_tipo_evidencia, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar tipo de evidencia
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM TipoEvidencia WHERE id_tipo_evidencia = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = TipoEvidenciaModel;
