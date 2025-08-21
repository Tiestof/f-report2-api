// ===========================================================
// Archivo: models/sistemaOperativo.model.js
// Descripción: Acceso a BD para tabla SistemaOperativo
// Notas:
//  - Se corrige el nombre de columna a 'nombre_sistema' (coincide con DDL).
//  - Se incorpora el campo 'activado' en SELECT/INSERT/UPDATE.
// ===========================================================

const db = require('../config/db');

const SistemaOperativoModel = {
  // Obtener todos los registros (exponemos 'activado' para que el frontend filtre)
  async getAll() {
    const [rows] = await db.query(
      'SELECT id_sistema_operativo, nombre_sistema, activado FROM SistemaOperativo ORDER BY nombre_sistema'
    );
    return rows;
  },

  // Obtener uno por ID
  async getById(id) {
    const [rows] = await db.query(
      'SELECT id_sistema_operativo, nombre_sistema, activado FROM SistemaOperativo WHERE id_sistema_operativo = ?',
      [id]
    );
    return rows[0];
  },

  // Crear nuevo registro (si no envían 'activado', usa DEFAULT=1)
  async create(data) {
    const { nombre_sistema, activado } = data;
    const [result] = await db.query(
      'INSERT INTO SistemaOperativo (nombre_sistema, activado) VALUES (?, COALESCE(?, 1))',
      [nombre_sistema, activado]
    );
    return result.insertId;
  },

  // Actualizar existente (permitimos actualizar nombre y activado)
  async update(id, data) {
    const { nombre_sistema, activado } = data;
    const [result] = await db.query(
      'UPDATE SistemaOperativo SET nombre_sistema = COALESCE(?, nombre_sistema), activado = COALESCE(?, activado) WHERE id_sistema_operativo = ?',
      [nombre_sistema, activado, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar por ID (hard delete)
  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM SistemaOperativo WHERE id_sistema_operativo = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = SistemaOperativoModel;
