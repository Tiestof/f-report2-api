// ===========================================================
// Archivo: controllers/usuario.controller.js
// Descripción: Lógica para acciones sobre Usuario
// ===========================================================

const Usuario = require('../models/usuario.model');

const UsuarioController = {
  // GET /api/usuarios/perfil
  perfil(req, res) {
    console.log('👤 Perfil solicitado por:', req.usuario);
    const { rut, tipo } = req.usuario;
    res.json({
      mensaje: 'Perfil del usuario autenticado',
      usuario: { rut, tipo }
    });
  },

  // GET /api/usuarios
  async getAll(req, res) {
    try {
      const lista = await Usuario.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ Error al obtener usuarios:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  },

  // POST /api/usuarios
  async create(req, res) {
    try {
      const nuevoUsuario = req.body;
      const id = await Usuario.create(nuevoUsuario);
      res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (error) {
      console.error('❌ Error al crear usuario:', error.message);
      res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
  },

  // PUT /api/usuarios/:rut
  async update(req, res) {
    try {
      const rut = req.params.rut;
      const cambios = req.body;
      const actualizado = await Usuario.update(rut, cambios);
      if (!actualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar usuario:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
  },

  // DELETE /api/usuarios/:rut
  async delete(req, res) {
    try {
      const rut = req.params.rut;
      const eliminado = await Usuario.delete(rut);
      if (!eliminado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar usuario:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
  }
};

module.exports = UsuarioController;
