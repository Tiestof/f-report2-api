// ================================================
// Archivo: tipoUsuario.controller.js
// Descripción: Lógica del backend para manejar TipoUsuario
// ================================================

const TipoUsuario = require('../models/tipoUsuario.model');

const TipoUsuarioController = {
  // GET /api/tipousuarios
  // Obtiene todos los registros
  async getAll(req, res) {
    const datos = await TipoUsuario.getAll();
    res.json(datos);
  },

  // GET /api/tipousuarios/:id
  // Busca un tipo de usuario por ID
  async getById(req, res) {
    const item = await TipoUsuario.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(item);
  },

  // POST /api/tipousuarios
  // Crea un nuevo tipo de usuario
  async create(req, res) {
    const id = await TipoUsuario.create(req.body);
    res.status(201).json({ id });
  },

  // PUT /api/tipousuarios/:id
  // Actualiza un tipo de usuario por ID
  async update(req, res) {
    await TipoUsuario.update(req.params.id, req.body);
    res.json({ mensaje: 'Actualizado' });
  },

  // DELETE /api/tipousuarios/:id
  // Elimina un tipo de usuario por ID
  async delete(req, res) {
    await TipoUsuario.delete(req.params.id);
    res.json({ mensaje: 'Eliminado' });
  }
};

module.exports = TipoUsuarioController;
