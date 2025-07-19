// ===========================================================
// Archivo: models/tipoGasto.model.js
// Descripción: Acceso a BD para tabla TipoGasto
// ===========================================================

const db = require('../config/db');

const TipoGastoModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await db.query('SELECT * FROM TipoGasto');
    return rows;
  },

  // Obtener uno por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM TipoGasto WHERE id_tipo_gasto = ?', [id]);
    return rows[0];
  },

  // Crear nuevo registro
  async create(data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'INSERT INTO TipoGasto (descripcion) VALUES (?)',
      [descripcion]
    );
    return result.insertId;
  },

  // Actualizar registro por ID
  async update(id, data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'UPDATE TipoGasto SET descripcion = ? WHERE id_tipo_gasto = ?',
      [descripcion, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar registro
  async delete(id) {
    const [result] = await db.query('DELETE FROM TipoGasto WHERE id_tipo_gasto = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = TipoGastoModel;
