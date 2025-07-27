// ===========================================================
// Archivo: gastoReporte.controller.js
// Descripción: Lógica para acciones sobre GastoReporte
// ===========================================================

const GastoReporte = require('../models/gastoReporte.model');

const GastoReporteController = {
  // GET /api/gastos → obtener todos
  async getAll(req, res) {
    try {
      const lista = await GastoReporte.getAll();
      res.json(lista);
    } catch (err) {
      console.error('❌ Error al obtener gastos:', err.message);
      res.status(500).json({ mensaje: 'Error al obtener gastos' });
    }
  },

  // GET /api/gastos/:id → obtener un gasto
  async getById(req, res) {
    try {
      const gasto = await GastoReporte.getById(req.params.id);
      if (!gasto) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json(gasto);
    } catch (err) {
      console.error('❌ Error al obtener gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al obtener gasto' });
    }
  },

  // GET /api/gastos/reporte/:id_reporte → gastos por reporte
  async getByReporte(req, res) {
    try {
      const lista = await GastoReporte.getByReporte(req.params.id_reporte);
      res.json(lista);
    } catch (err) {
      console.error('❌ Error al obtener gastos por reporte:', err.message);
      res.status(500).json({ mensaje: 'Error al obtener gastos por reporte' });
    }
  },

  // POST /api/gastos → crear nuevo gasto
  async create(req, res) {
    try {
      const nuevo = req.body;
      const id = await GastoReporte.create(nuevo);
      res.status(201).json({ mensaje: 'Gasto creado', id });
    } catch (err) {
      console.error('❌ Error al crear gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al crear gasto' });
    }
  },

  // PUT /api/gastos/:id → actualizar gasto
  async update(req, res) {
    try {
      const actualizado = await GastoReporte.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json({ mensaje: 'Gasto actualizado correctamente' });
    } catch (err) {
      console.error('❌ Error al actualizar gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al actualizar gasto' });
    }
  },

  // DELETE /api/gastos/:id → eliminar gasto
  async delete(req, res) {
    try {
      const eliminado = await GastoReporte.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json({ mensaje: 'Gasto eliminado correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al eliminar gasto' });
    }
  }
};

module.exports = GastoReporteController;
