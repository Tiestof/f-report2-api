// ================================================
// Archivo: tipoUsuario.model.js
// Descripción: Acceso a base de datos para la tabla TipoUsuario
// ================================================

const db = require('../config/db');

const TipoUsuarioModel = {
  // Ejecuta SELECT * FROM TipoUsuario
  async getAll() {
    const [rows] = await db.query('SELECT * FROM TipoUsuario');
    return rows;
  },

  // Ejecuta SELECT por ID
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM TipoUsuario WHERE Id_tipo_usuario = ?', [id]);
    return rows[0];
  },

  // Ejecuta INSERT con descripción
  async create(data) {
    const { descripcion_usuario } = data;
    const [result] = await db.query(
      'INSERT INTO TipoUsuario (descripcion_usuario) VALUES (?)',
      [descripcion_usuario]
    );
    return result.insertId;
  },

  // Ejecuta UPDATE por ID
  async update(id, data) {
    const { descripcion_usuario } = data;
    await db.query(
      'UPDATE TipoUsuario SET descripcion_usuario = ? WHERE Id_tipo_usuario = ?',
      [descripcion_usuario, id]
    );
  },

  // Ejecuta DELETE por ID
  async delete(id) {
    await db.query('DELETE FROM TipoUsuario WHERE Id_tipo_usuario = ?', [id]);
  }
};

module.exports = TipoUsuarioModel;
