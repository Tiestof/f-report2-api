// ===========================================================
// Archivo: controllers/gastoReporte.controller.js
// Descripción: Lógica del backend para GastoReporte
// ===========================================================

const GastoReporte = require('../models/gastoReporte.model');

const GastoReporteController = {
  // GET /api/gastos → listar todos los gastos
  async getAll(req, res) {
    try {
      const lista = await GastoReporte.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener gastos:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener gastos' });
    }
  },

  // GET /api/gastos/:id → obtener gasto por ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const gasto = await GastoReporte.getById(id);
      if (!gasto) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json(gasto);
    } catch (error) {
      console.error('❌ Error al obtener gasto por ID:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener gasto' });
    }
  },

  // POST /api/gastos → crear nuevo gasto
  async create(req, res) {
    try {
      const id = await GastoReporte.create(req.body);
      res.status(201).json({ mensaje: 'Gasto creado', id });
    } catch (error) {
      console.error('❌ Error al crear gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al crear gasto' });
    }
  },

  // PUT /api/gastos/:id → actualizar gasto
  async update(req, res) {
    try {
      const id = req.params.id;
      const actualizado = await GastoReporte.update(id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json({ mensaje: 'Gasto actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar gasto' });
    }
  },

  // DELETE /api/gastos/:id → eliminar gasto
  async delete(req, res) {
    try {
      const id = req.params.id;
      const eliminado = await GastoReporte.delete(id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json({ mensaje: 'Gasto eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar gasto' });
    }
  }
};

module.exports = GastoReporteController;
