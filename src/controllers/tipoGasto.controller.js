// ===========================================================
// Archivo: controllers/tipoGasto.controller.js
// Descripción: Lógica del backend para TipoGasto
// ===========================================================

const TipoGasto = require('../models/tipoGasto.model');

const TipoGastoController = {
  // GET /api/tipogastos → obtener todos
  async getAll(req, res) {
    try {
      const lista = await TipoGasto.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener tipos de gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipos de gasto' });
    }
  },

  // GET /api/tipogastos/:id → obtener por ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await TipoGasto.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Tipo de gasto no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener tipo de gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipo de gasto' });
    }
  },

  // POST /api/tipogastos → crear nuevo
  async create(req, res) {
    try {
      const { descripcion } = req.body;
      const id = await TipoGasto.create({ descripcion });
      res.status(201).json({ mensaje: 'Tipo de gasto creado', id });
    } catch (error) {
      console.error('❌ Error al crear tipo de gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tipo de gasto' });
    }
  },

  // PUT /api/tipogastos/:id → actualizar existente
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion } = req.body;
      const ok = await TipoGasto.update(id, { descripcion });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de gasto no encontrado' });
      res.json({ mensaje: 'Tipo de gasto actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar tipo de gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tipo de gasto' });
    }
  },

  // DELETE /api/tipogastos/:id → eliminar
  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await TipoGasto.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de gasto no encontrado' });
      res.json({ mensaje: 'Tipo de gasto eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar tipo de gasto:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar tipo de gasto' });
    }
  }
};

module.exports = TipoGastoController;
