// ===========================================================
// Archivo: models/centroCosto.model.js
// Descripción: Acceso a BD para tabla CentroCosto
// ===========================================================

const pool = require('../config/db');

const CentroCostoModel = {
  // Obtener todos los registros
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM CentroCosto');
    return rows;
  },

  // Obtener un registro por ID
  async getById(id_rut_empresa_cobro) {
    const [rows] = await pool.query(
      'SELECT * FROM CentroCosto WHERE id_rut_empresa_cobro = ?',
      [id_rut_empresa_cobro]
    );
    return rows[0];
  },

  // Crear nuevo centro de costo
  async create(data) {
    const { id_rut_empresa_cobro, nombre_centro_costo } = data;
    await pool.query(
      'INSERT INTO CentroCosto (id_rut_empresa_cobro, nombre_centro_costo) VALUES (?, ?)',
      [id_rut_empresa_cobro, nombre_centro_costo]
    );
    return id_rut_empresa_cobro;
  },

  // Actualizar centro de costo existente
  async update(id_rut_empresa_cobro, data) {
    const { nombre_centro_costo } = data;
    const [result] = await pool.query(
      'UPDATE CentroCosto SET nombre_centro_costo = ? WHERE id_rut_empresa_cobro = ?',
      [nombre_centro_costo, id_rut_empresa_cobro]
    );
    return result.affectedRows > 0;
  },

  // Eliminar centro de costo
  async delete(id_rut_empresa_cobro) {
    const [result] = await pool.query(
      'DELETE FROM CentroCosto WHERE id_rut_empresa_cobro = ?',
      [id_rut_empresa_cobro]
    );
    return result.affectedRows > 0;
  }
};

module.exports = CentroCostoModel;
