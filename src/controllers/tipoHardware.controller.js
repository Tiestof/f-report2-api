// ===========================================================
// Archivo: controllers/tipoHardware.controller.js
// Descripción: Lógica del backend para TipoHardware
// ===========================================================

const TipoHardware = require('../models/tipoHardware.model');

const TipoHardwareController = {
  // GET /api/tipohardware → listar todos
  async getAll(req, res) {
    try {
      const lista = await TipoHardware.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener hardware:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener hardware' });
    }
  },

  // GET /api/tipohardware/:id → obtener por ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await TipoHardware.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Tipo de hardware no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener hardware por ID:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener hardware' });
    }
  },

  // POST /api/tipohardware → crear nuevo
  async create(req, res) {
    try {
      const { descripcion } = req.body;
      const id = await TipoHardware.create({ descripcion });
      res.status(201).json({ mensaje: 'Tipo de hardware creado', id });
    } catch (error) {
      console.error('❌ Error al crear hardware:', error.message);
      res.status(500).json({ mensaje: 'Error al crear hardware' });
    }
  },

  // PUT /api/tipohardware/:id → actualizar existente
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion } = req.body;
      const ok = await TipoHardware.update(id, { descripcion });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de hardware no encontrado' });
      res.json({ mensaje: 'Tipo de hardware actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar hardware:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar hardware' });
    }
  },

  // DELETE /api/tipohardware/:id → eliminar
  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await TipoHardware.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de hardware no encontrado' });
      res.json({ mensaje: 'Tipo de hardware eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar hardware:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar hardware' });
    }
  }
};

module.exports = TipoHardwareController;
