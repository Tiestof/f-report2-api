// ===========================================================
// Archivo: controllers/centroCosto.controller.js
// Descripción: Lógica del backend para CentroCosto
// ===========================================================

const CentroCosto = require('../models/centroCosto.model');

const CentroCostoController = {
  // GET /api/centrocostos → obtener todos los registros
  async getAll(req, res) {
    try {
      const lista = await CentroCosto.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener centros de costo:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener centros de costo' });
    }
  },

  // GET /api/centrocostos/:id → obtener uno por ID
  async getById(req, res) {
    try {
      const item = await CentroCosto.getById(req.params.id);
      if (!item) return res.status(404).json({ mensaje: 'Centro de costo no encontrado' });
      res.json(item);
    } catch (error) {
      console.error('❌ Error al obtener centro de costo:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener centro de costo' });
    }
  },

  // POST /api/centrocostos → crear nuevo centro de costo
  async create(req, res) {
    try {
      const nuevo = req.body;
      const id = await CentroCosto.create(nuevo);
      res.status(201).json({ mensaje: 'Centro de costo creado', id_rut_empresa_cobro: id });
    } catch (error) {
      console.error('❌ Error al crear centro de costo:', error.message);
      res.status(500).json({ mensaje: 'Error al crear centro de costo' });
    }
  },

  // PUT /api/centrocostos/:id → actualizar centro de costo
  async update(req, res) {
    try {
      const id = req.params.id;
      const cambios = req.body;
      const actualizado = await CentroCosto.update(id, cambios);
      if (!actualizado) return res.status(404).json({ mensaje: 'Centro de costo no encontrado' });
      res.json({ mensaje: 'Centro de costo actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar centro de costo:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar centro de costo' });
    }
  },

  // DELETE /api/centrocostos/:id → eliminar centro de costo
  async delete(req, res) {
    try {
      const id = req.params.id;
      const eliminado = await CentroCosto.delete(id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Centro de costo no encontrado' });
      res.json({ mensaje: 'Centro de costo eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar centro de costo:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar centro de costo' });
    }
  }
};

module.exports = CentroCostoController;
