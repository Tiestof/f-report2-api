// ===========================================================
// Archivo: controllers/sistemaOperativo.controller.js
// Descripción: Lógica del backend para SistemaOperativo
// ===========================================================

const SistemaOperativo = require('../models/sistemaOperativo.model');

const SistemaOperativoController = {
  // GET /api/sistemasoperativos
  async getAll(req, res) {
    try {
      const lista = await SistemaOperativo.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener sistemas operativos:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener sistemas operativos' });
    }
  },

  // GET /api/sistemasoperativos/:id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await SistemaOperativo.getById(id);
      if (!item) return res.status(404).json({ mensaje: 'Sistema operativo no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener sistema operativo:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener sistema operativo' });
    }
  },

  // POST /api/sistemasoperativos
  async create(req, res) {
    try {
      const { descripcion } = req.body;
      const id = await SistemaOperativo.create({ descripcion });
      res.status(201).json({ mensaje: 'Sistema operativo creado', id });
    } catch (error) {
      console.error('❌ Error al crear sistema operativo:', error.message);
      res.status(500).json({ mensaje: 'Error al crear sistema operativo' });
    }
  },

  // PUT /api/sistemasoperativos/:id
  async update(req, res) {
    try {
      const id = req.params.id;
      const { descripcion } = req.body;
      const ok = await SistemaOperativo.update(id, { descripcion });
      if (!ok) return res.status(404).json({ mensaje: 'Sistema operativo no encontrado' });
      res.json({ mensaje: 'Sistema operativo actualizado' });
    } catch (error) {
      console.error('❌ Error al actualizar sistema operativo:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar sistema operativo' });
    }
  },

  // DELETE /api/sistemasoperativos/:id
  async delete(req, res) {
    try {
      const id = req.params.id;
      const ok = await SistemaOperativo.delete(id);
      if (!ok) return res.status(404).json({ mensaje: 'Sistema operativo no encontrado' });
      res.json({ mensaje: 'Sistema operativo eliminado' });
    } catch (error) {
      console.error('❌ Error al eliminar sistema operativo:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar sistema operativo' });
    }
  }
};

module.exports = SistemaOperativoController;
