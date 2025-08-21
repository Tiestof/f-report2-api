// ===========================================================
// Archivo: models/centroCosto.model.js
// Descripción: Acceso a BD para tabla CentroCosto
// Nota: Se incorpora 'activado' en SELECT/INSERT/UPDATE.
// ===========================================================

const pool = require('../config/db');

const CentroCostoModel = {
  // Listar todos (incluye 'activado')
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_rut_empresa_cobro, nombre_centro_costo, activado FROM CentroCosto ORDER BY nombre_centro_costo'
    );
    return rows;
  },

  // Obtener uno
  async getById(id_rut_empresa_cobro) {
    const [rows] = await pool.query(
      'SELECT id_rut_empresa_cobro, nombre_centro_costo, activado FROM CentroCosto WHERE id_rut_empresa_cobro = ?',
      [id_rut_empresa_cobro]
    );
    return rows[0];
  },

  // Crear
  async create(data) {
    const { id_rut_empresa_cobro, nombre_centro_costo, activado } = data;
    await pool.query(
      'INSERT INTO CentroCosto (id_rut_empresa_cobro, nombre_centro_costo, activado) VALUES (?, ?, COALESCE(?, 1))',
      [id_rut_empresa_cobro, nombre_centro_costo, activado]
    );
    return id_rut_empresa_cobro;
  },

  // Actualizar
  async update(id_rut_empresa_cobro, data) {
    const { nombre_centro_costo, activado } = data;
    const [result] = await pool.query(
      'UPDATE CentroCosto SET nombre_centro_costo = COALESCE(?, nombre_centro_costo), activado = COALESCE(?, activado) WHERE id_rut_empresa_cobro = ?',
      [nombre_centro_costo, activado, id_rut_empresa_cobro]
    );
    return result.affectedRows > 0;
  },

  // Eliminar
  async delete(id_rut_empresa_cobro) {
    const [result] = await pool.query(
      'DELETE FROM CentroCosto WHERE id_rut_empresa_cobro = ?',
      [id_rut_empresa_cobro]
    );
    return result.affectedRows > 0;
  }
};

module.exports = CentroCostoModel;
