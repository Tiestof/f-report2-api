// ===========================================================
// Archivo: models/cliente.model.js
// Descripción: Acceso a BD para tabla Cliente
// Nota: Se incorpora 'activado' en todas las operaciones.
// ===========================================================

const db = require('../config/db');

const ClienteModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT rut_cliente, nombre_cliente, tipo_cliente, activado FROM Cliente ORDER BY nombre_cliente'
    );
    return rows;
  },

  async getById(rut_cliente) {
    const [rows] = await db.query(
      'SELECT rut_cliente, nombre_cliente, tipo_cliente, activado FROM Cliente WHERE rut_cliente = ?',
      [rut_cliente]
    );
    return rows[0];
  },

  async create(data) {
    const { rut_cliente, nombre_cliente, tipo_cliente, activado } = data;
    await db.query(
      'INSERT INTO Cliente (rut_cliente, nombre_cliente, tipo_cliente, activado) VALUES (?, ?, ?, COALESCE(?, 1))',
      [rut_cliente, nombre_cliente, tipo_cliente, activado]
    );
    return rut_cliente;
  },

  async update(rut_cliente, data) {
    const { nombre_cliente, tipo_cliente, activado } = data;
    const [result] = await db.query(
      'UPDATE Cliente SET nombre_cliente = COALESCE(?, nombre_cliente), tipo_cliente = COALESCE(?, tipo_cliente), activado = COALESCE(?, activado) WHERE rut_cliente = ?',
      [nombre_cliente, tipo_cliente, activado, rut_cliente]
    );
    return result.affectedRows > 0;
  },

  async delete(rut_cliente) {
    const [result] = await db.query(
      'DELETE FROM Cliente WHERE rut_cliente = ?',
      [rut_cliente]
    );
    return result.affectedRows > 0;
  }
};

module.exports = ClienteModel;
