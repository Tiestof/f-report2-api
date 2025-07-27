// ===========================================================
// Archivo: controllers/auditoria.controller.js
// Descripción: Lógica del backend para AuditoriaSistema
// ===========================================================

const Auditoria = require('../models/auditoria.model');

const AuditoriaController = {
  // GET /api/auditoria → obtener todos los registros
  async getAll(req, res) {
    try {
      const lista = await Auditoria.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener auditoría:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener auditoría' });
    }
  },

  // GET /api/auditoria/:id → obtener un registro
  async getById(req, res) {
    try {
      const item = await Auditoria.getById(req.params.id);
      if (!item) return res.status(404).json({ mensaje: 'Registro no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener registro de auditoría:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener registro de auditoría' });
    }
  },

  // POST /api/auditoria → crear registro de auditoría
  async create(req, res) {
    try {
      const nuevo = req.body;
      const id = await Auditoria.create(nuevo);
      res.status(201).json({ mensaje: 'Registro de auditoría creado', id });
    } catch (error) {
      console.error('❌ Error al crear registro de auditoría:', error.message);
      res.status(500).json({ mensaje: 'Error al crear registro de auditoría' });
    }
  },

  // PUT /api/auditoria/:id → actualizar registro (opcional)
  async update(req, res) {
    try {
      const actualizado = await Auditoria.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Registro no encontrado' });
      res.json({ mensaje: 'Registro de auditoría actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar auditoría:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar auditoría' });
    }
  },

  // DELETE /api/auditoria/:id → eliminar registro (opcional)
  async delete(req, res) {
    try {
      const eliminado = await Auditoria.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Registro no encontrado' });
      res.json({ mensaje: 'Registro de auditoría eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar auditoría:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar auditoría' });
    }
  }
};

module.exports = AuditoriaController;
