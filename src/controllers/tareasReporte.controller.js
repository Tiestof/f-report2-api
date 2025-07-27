// ===========================================================
// Archivo: controllers/tareasReporte.controller.js
// Descripción: Lógica del backend para Tareas_Reporte
// ===========================================================

const TareasReporte = require('../models/tareasReporte.model');

const TareasReporteController = {
  // GET /api/tareas → obtener todas las tareas
  async getAll(req, res) {
    try {
      const lista = await TareasReporte.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener tareas:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tareas' });
    }
  },

  // GET /api/tareas/:id → obtener una tarea por ID
  async getById(req, res) {
    try {
      const item = await TareasReporte.getById(req.params.id);
      if (!item) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tarea' });
    }
  },

  // GET /api/tareas/reporte/:id_reporte → tareas de un reporte específico
  async getByReporte(req, res) {
    try {
      const lista = await TareasReporte.getByReporte(req.params.id_reporte);
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener tareas del reporte:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tareas del reporte' });
    }
  },

  // POST /api/tareas → crear nueva tarea
  async create(req, res) {
    try {
      const nueva = req.body;
      const id = await TareasReporte.create(nueva);
      res.status(201).json({ mensaje: 'Tarea creada', id });
    } catch (error) {
      console.error('❌ Error al crear tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tarea' });
    }
  },

  // PUT /api/tareas/:id → actualizar tarea
  async update(req, res) {
    try {
      const actualizado = await TareasReporte.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
      res.json({ mensaje: 'Tarea actualizada correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tarea' });
    }
  },

  // DELETE /api/tareas/:id → eliminar tarea
  async delete(req, res) {
    try {
      const eliminado = await TareasReporte.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
      res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar tarea' });
    }
  }
};

module.exports = TareasReporteController;
