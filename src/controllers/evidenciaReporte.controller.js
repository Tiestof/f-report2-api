// ===========================================================
// Archivo: controllers/evidenciaReporte.controller.js
// Descripción: Lógica del backend para EvidenciaReporte
// ===========================================================

const EvidenciaReporte = require('../models/evidenciaReporte.model');

const EvidenciaReporteController = {
  // GET /api/evidencias → obtener todas
  async getAll(req, res) {
    try {
      const lista = await EvidenciaReporte.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener evidencias:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener evidencias' });
    }
  },

  // GET /api/evidencias/:id → obtener una evidencia
  async getById(req, res) {
    try {
      const item = await EvidenciaReporte.getById(req.params.id);
      if (!item) return res.status(404).json({ mensaje: 'Evidencia no encontrada' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener evidencia' });
    }
  },

  // GET /api/evidencias/reporte/:id_reporte → evidencias de un reporte
  async getByReporte(req, res) {
    try {
      const lista = await EvidenciaReporte.getByReporte(req.params.id_reporte);
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener evidencias del reporte:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener evidencias del reporte' });
    }
  },

  // POST /api/evidencias → crear evidencia
  async create(req, res) {
    try {
      const nueva = req.body;
      const id = await EvidenciaReporte.create(nueva);
      res.status(201).json({ mensaje: 'Evidencia creada', id });
    } catch (error) {
      console.error('❌ Error al crear evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al crear evidencia' });
    }
  },

  // PUT /api/evidencias/:id → actualizar evidencia
  async update(req, res) {
    try {
      const actualizado = await EvidenciaReporte.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Evidencia no encontrada' });
      res.json({ mensaje: 'Evidencia actualizada correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar evidencia' });
    }
  },

  // DELETE /api/evidencias/:id → eliminar evidencia
  async delete(req, res) {
    try {
      const eliminado = await EvidenciaReporte.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Evidencia no encontrada' });
      res.json({ mensaje: 'Evidencia eliminada correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar evidencia' });
    }
  }
};

module.exports = EvidenciaReporteController;
