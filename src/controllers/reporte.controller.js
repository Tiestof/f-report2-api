// ===========================================================
// Archivo: controllers/reporte.controller.js
// Descripción: Lógica del backend para Reporte
// ===========================================================

const Reporte = require('../models/reporte.model');

const ReporteController = {
  // GET /api/reportes → obtener todos los reportes
  async getAll(req, res) {
    try {
      const lista = await Reporte.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener reportes:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener reportes' });
    }
  },

  // GET /api/reportes/:id → obtener reporte específico
  async getById(req, res) {
    try {
      const item = await Reporte.getById(req.params.id);
      if (!item) return res.status(404).json({ mensaje: 'Reporte no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener reporte:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener reporte' });
    }
  },

  // POST /api/reportes → crear nuevo reporte
  async create(req, res) {
    try {
      const nuevo = req.body;
      const id = await Reporte.create(nuevo);
      res.status(201).json({ mensaje: 'Reporte creado', id_reporte: id });
    } catch (error) {
      console.error('❌ Error al crear reporte:', error.message);
      res.status(500).json({ mensaje: 'Error al crear reporte' });
    }
  },

  // PUT /api/reportes/:id → actualizar reporte
  async update(req, res) {
    try {
      const id = req.params.id;
      const actualizado = await Reporte.update(id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Reporte no encontrado' });
      res.json({ mensaje: 'Reporte actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar reporte:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar reporte' });
    }
  },

  // DELETE /api/reportes/:id → eliminar reporte
  async delete(req, res) {
    try {
      const eliminado = await Reporte.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Reporte no encontrado' });
      res.json({ mensaje: 'Reporte eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar reporte:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar reporte' });
    }
  }
};

module.exports = ReporteController;
