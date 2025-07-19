// ===========================================================
// Archivo: controllers/tipoServicio.controller.js
// Descripción: Lógica del backend para TipoServicio
// ===========================================================

const TipoServicio = require('../models/tipoServicio.model');

const TipoServicioController = {
  // GET /api/tiposervicios
  async getAll(req, res) {
    try {
      const datos = await TipoServicio.getAll();
      res.json(datos);
    } catch (error) {
      console.error('❌ Error al obtener tipo de servicios:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipo de servicios' });
    }
  },

  // GET /api/tiposervicios/:id
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

  // POST /api/tiposervicios
  async create(req, res) {
    try {
      const { descripcion } = req.body;
      const id = await TipoServicio.create({ descripcion });
      res.status(201).json({ mensaje: 'Tipo de servicio creado', id });
    } catch (error) {
      console.error('❌ Error al crear tipo de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tipo de servicio' });
    }
  },

  // PUT /api/tiposervicios/:id
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion } = req.body;
      const ok = await TipoServicio.update(id, { descripcion });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de servicio no encontrado' });
      res.json({ mensaje: 'Tipo de servicio actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar tipo de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tipo de servicio' });
    }
  },

  // DELETE /api/tiposervicios/:id
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
