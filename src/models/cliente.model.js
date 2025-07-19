// ===========================================================
// Archivo: models/cliente.model.js
// Descripción: Acceso a BD para tabla Cliente
// ===========================================================

const db = require('../config/db');

const ClienteModel = {
  // Obtener todos los clientes
  async getAll() {
    const [rows] = await db.query('SELECT * FROM Cliente');
    return rows;
  },

  // Obtener cliente por RUT
  async getById(rut_cliente) {
    const [rows] = await db.query('SELECT * FROM Cliente WHERE rut_cliente = ?', [rut_cliente]);
    return rows[0];
  },

  // Crear cliente
  async create(data) {
    const { rut_cliente, nombre_cliente, tipo_cliente } = data;
    await db.query(
      'INSERT INTO Cliente (rut_cliente, nombre_cliente, tipo_cliente) VALUES (?, ?, ?)',
      [rut_cliente, nombre_cliente, tipo_cliente]
    );
    return rut_cliente;
  },

  // Actualizar cliente
  async update(rut_cliente, data) {
    const { nombre_cliente, tipo_cliente } = data;
    const [result] = await db.query(
      'UPDATE Cliente SET nombre_cliente = ?, tipo_cliente = ? WHERE rut_cliente = ?',
      [nombre_cliente, tipo_cliente, rut_cliente]
    );
    return result.affectedRows > 0;
  },

  // Eliminar cliente
  async delete(rut_cliente) {
    const [result] = await db.query('DELETE FROM Cliente WHERE rut_cliente = ?', [rut_cliente]);
    return result.affectedRows > 0;
  }
};

module.exports = ClienteModel;
