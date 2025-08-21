// ===========================================================
// Archivo: controllers/tipoTarea.controller.js
// Descripción: Lógica del backend para TipoTarea
// Nota: Soporta 'activado' en create/update.
// ===========================================================

const TipoTarea = require('../models/tipoTarea.model');

const TipoTareaController = {
  async getAll(req, res) {
    try {
      const lista = await TipoTarea.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener tipos de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipos de tarea' });
    }
  },

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

  async create(req, res) {
    try {
      const { descripcion_tipo_tarea, activado } = req.body;
      const id = await TipoTarea.create({ descripcion_tipo_tarea, activado });
      res.status(201).json({ mensaje: 'Tipo de tarea creado', id });
    } catch (error) {
      console.error('❌ Error al crear tipo de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tipo de tarea' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion_tipo_tarea, activado } = req.body;
      const ok = await TipoTarea.update(id, { descripcion_tipo_tarea, activado });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de tarea no encontrado' });
      res.json({ mensaje: 'Tipo de tarea actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar tipo de tarea:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tipo de tarea' });
    }
  },

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
