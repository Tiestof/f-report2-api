// ===========================================================
// Archivo: controllers/tipoEvidencia.controller.js
// Descripción: Lógica del backend para TipoEvidencia
// ===========================================================

const TipoEvidencia = require('../models/tipoEvidencia.model');

const TipoEvidenciaController = {
  // GET /api/tipoevidencias → obtener todos
  async getAll(req, res) {
    try {
      const lista = await TipoEvidencia.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener tipos de evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipos de evidencia' });
    }
  },

  // GET /api/tipoevidencias/:id → obtener uno por ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await TipoEvidencia.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Tipo de evidencia no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener tipo de evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener tipo de evidencia' });
    }
  },

  // POST /api/tipoevidencias → crear nuevo
  async create(req, res) {
    try {
      const { descripcion_tipo_evidencia } = req.body;
      const id = await TipoEvidencia.create({ descripcion_tipo_evidencia });
      res.status(201).json({ mensaje: 'Tipo de evidencia creado', id });
    } catch (error) {
      console.error('❌ Error al crear tipo de evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al crear tipo de evidencia' });
    }
  },

  // PUT /api/tipoevidencias/:id → actualizar existente
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion_tipo_evidencia } = req.body;
      const ok = await TipoEvidencia.update(id, { descripcion_tipo_evidencia });
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de evidencia no encontrado' });
      res.json({ mensaje: 'Tipo de evidencia actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar tipo de evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar tipo de evidencia' });
    }
  },

  // DELETE /api/tipoevidencias/:id → eliminar
  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await TipoEvidencia.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Tipo de evidencia no encontrado' });
      res.json({ mensaje: 'Tipo de evidencia eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar tipo de evidencia:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar tipo de evidencia' });
    }
  }
};

module.exports = TipoEvidenciaController;
