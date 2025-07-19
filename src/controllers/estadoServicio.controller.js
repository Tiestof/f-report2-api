// ===========================================================
// Archivo: controllers/estadoServicio.controller.js
// Descripción: Lógica del backend para EstadoServicio
// ===========================================================

const EstadoServicio = require('../models/estadoServicio.model');

const EstadoServicioController = {
  // GET /api/estadoservicios → obtener todos
  async getAll(req, res) {
    try {
      const lista = await EstadoServicio.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener estados:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener estados de servicio' });
    }
  },

  // GET /api/estadoservicios/:id → obtener uno
  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await EstadoServicio.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Estado de servicio no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener estado por ID:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener estado de servicio' });
    }
  },

  // POST /api/estadoservicios → crear nuevo
  async create(req, res) {
    try {
      const { descripcion } = req.body;
      const id = await EstadoServicio.create({ descripcion });
      res.status(201).json({ mensaje: 'Estado de servicio creado', id });
    } catch (error) {
      console.error('❌ Error al crear estado de servicio:', error.message);
      res.status(500).json({ mensaje: 'Error al crear estado de servicio' });
    }
  },

  // PUT /api/estadoservicios/:id → actualizar
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion } = req.body;
      const ok = await EstadoServicio.update(id, { descripcion });
      if (!ok) return res.status(404).json({ mensaje: 'Estado de servicio no encontrado' });
      res.json({ mensaje: 'Estado de servicio actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar estado:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar estado de servicio' });
    }
  },

  // DELETE /api/estadoservicios/:id → eliminar
  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await EstadoServicio.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Estado de servicio no encontrado' });
      res.json({ mensaje: 'Estado de servicio eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar estado:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar estado de servicio' });
    }
  }
};

module.exports = EstadoServicioController;
