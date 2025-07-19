// ===========================================================
// Archivo: models/sistemaOperativo.model.js
// Descripción: Acceso a BD para tabla SistemaOperativo
// ===========================================================

const db = require('../config/db');

const SistemaOperativoModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await db.query('SELECT * FROM SistemaOperativo');
    return rows;
  },

  // Obtener uno por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM SistemaOperativo WHERE id_sistema_operativo = ?', [id]);
    return rows[0];
  },

  // Crear nuevo registro
  async create(data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'INSERT INTO SistemaOperativo (descripcion) VALUES (?)',
      [descripcion]
    );
    return result.insertId;
  },

  // Actualizar existente
  async update(id, data) {
    const { descripcion } = data;
    const [result] = await db.query(
      'UPDATE SistemaOperativo SET descripcion = ? WHERE id_sistema_operativo = ?',
      [descripcion, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar por ID
  async delete(id) {
    const [result] = await db.query('DELETE FROM SistemaOperativo WHERE id_sistema_operativo = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = SistemaOperativoModel;
