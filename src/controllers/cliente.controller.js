// ===========================================================
// Archivo: controllers/cliente.controller.js
// Descripción: Lógica del backend para Cliente
// Nota: Ahora se admite 'activado' en create/update. GETs lo devuelven.
// ===========================================================

const Cliente = require('../models/cliente.model');

const ClienteController = {
  async getAll(req, res) {
    try {
      const lista = await Cliente.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener clientes:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener clientes' });
    }
  },

  async getById(req, res) {
    try {
      const rut = req.params.rut_cliente;
      const cliente = await Cliente.getById(rut);
      if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      res.json(cliente);
    } catch (error) {
      console.error('❌ Error al obtener cliente:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener cliente' });
    }
  },

  async create(req, res) {
    try {
      const nuevoCliente = req.body; // {rut_cliente, nombre_cliente, tipo_cliente, activado?}
      const rut = await Cliente.create(nuevoCliente);
      res.status(201).json({ mensaje: 'Cliente creado', rut_cliente: rut });
    } catch (error) {
      console.error('❌ Error al crear cliente:', error.message);
      res.status(500).json({ mensaje: 'Error al crear cliente' });
    }
  },

  async update(req, res) {
    try {
      const rut = req.params.rut_cliente;
      const cambios = req.body; // {nombre_cliente?, tipo_cliente?, activado?}
      const ok = await Cliente.update(rut, cambios);
      if (!ok) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      res.json({ mensaje: 'Cliente actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar cliente:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar cliente' });
    }
  },

  async delete(req, res) {
    try {
      const rut = req.params.rut_cliente;
      const ok = await Cliente.delete(rut);
      if (!ok) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar cliente:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar cliente' });
    }
  }
};

module.exports = ClienteController;
