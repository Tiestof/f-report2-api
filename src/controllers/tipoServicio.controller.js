// ===========================================================
// Archivo: controllers/tipoServicio.controller.js
// Descripción: Lógica del backend para TipoServicio
// Nota: Soporta 'activado' en create/update. getAll/getById devuelven 'activado'.
// ===========================================================

const TipoServicio = require('../models/tipoServicio.model');

const TipoServicioController = {
  async getAll(req, res) {
    try {
      const datos = await TipoServicio.getAll();
      res.json(datos);
    } catch (error) {
      console.error('❌ Error al obtener tipo de servicios:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipo de servicios' });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await TipoServicio.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Tipo de servicio no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener tipo de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipo de servicio' });
    }
  },

  async create(req, res) {
    try {
      const { descripcion, activado } = req.body; // <- nuevo
      const id = await TipoServicio.create({ descripcion, activado });
      res.status(201).json({ mensaje: 'Tipo de servicio creado', id });
    } catch (error) {
      console.error('❌ Error al crear tipo de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tipo de servicio' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion, activado } = req.body; // <- nuevo
      const ok = await TipoServicio.update(id, { descripcion, activado });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de servicio no encontrado' });
      res.json({ mensaje: 'Tipo de servicio actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar tipo de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tipo de servicio' });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await TipoServicio.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de servicio no encontrado' });
      res.json({ mensaje: 'Tipo de servicio eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar tipo de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar tipo de servicio' });
    }
  }
};

module.exports = TipoServicioController;
