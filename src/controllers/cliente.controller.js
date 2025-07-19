// ===========================================================
// Archivo: controllers/cliente.controller.js
// Descripción: Lógica del backend para Cliente
// ===========================================================

const Cliente = require('../models/cliente.model');

const ClienteController = {
  // GET /api/clientes
  async getAll(req, res) {
    try {
      const lista = await Cliente.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener clientes:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener clientes' });
    }
  },

  // GET /api/clientes/:rut_cliente
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

  // POST /api/clientes
  async create(req, res) {
    try {
      const nuevoCliente = req.body;
      const rut = await Cliente.create(nuevoCliente);
      res.status(201).json({ mensaje: 'Cliente creado', rut_cliente: rut });
    } catch (error) {
      console.error('❌ Error al crear cliente:', error.message);
      res.status(500).json({ mensaje: 'Error al crear cliente' });
    }
  },

  // PUT /api/clientes/:rut_cliente
  async update(req, res) {
    try {
      const rut = req.params.rut_cliente;
      const cambios = req.body;
      const ok = await Cliente.update(rut, cambios);
      if (!ok) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      res.json({ mensaje: 'Cliente actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar cliente:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar cliente' });
    }
  },

  // DELETE /api/clientes/:rut_cliente
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
