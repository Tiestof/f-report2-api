// ===========================================================
// Archivo: controllers/tipoTarea.controller.js
// Descripción: Lógica del backend para TipoTarea
// ===========================================================

const TipoTarea = require('../models/tipoTarea.model');

const TipoTareaController = {
  // GET /api/tipotareas → listar todos
  async getAll(req, res) {
    try {
      const lista = await TipoTarea.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener tipos de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipos de tarea' });
    }
  },

  // GET /api/tipotareas/:id → obtener uno
  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await TipoTarea.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Tipo de tarea no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener tipo de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipo de tarea' });
    }
  },

  // POST /api/tipotareas → crear nuevo tipo de tarea
  async create(req, res) {
    try {
      const { descripcion_tipo_tarea } = req.body;
      const id = await TipoTarea.create({ descripcion_tipo_tarea });
      res.status(201).json({ mensaje: 'Tipo de tarea creado', id });
    } catch (error) {
      console.error('❌ Error al crear tipo de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tipo de tarea' });
    }
  },

  // PUT /api/tipotareas/:id → actualizar tipo de tarea
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion_tipo_tarea } = req.body;
      const ok = await TipoTarea.update(id, { descripcion_tipo_tarea });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de tarea no encontrado' });
      res.json({ mensaje: 'Tipo de tarea actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar tipo de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tipo de tarea' });
    }
  },

  // DELETE /api/tipotareas/:id → eliminar tipo de tarea
  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await TipoTarea.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de tarea no encontrado' });
      res.json({ mensaje: 'Tipo de tarea eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar tipo de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar tipo de tarea' });
    }
  }
};

module.exports = TipoTareaController;
