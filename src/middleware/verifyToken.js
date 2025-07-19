// ===========================================================
// Archivo: middleware/verifyToken.js
// Descripción: Middleware para validar token y roles
// ===========================================================

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const verifyToken = (rolesPermitidos = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Token no proporcionado.' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const usuario = await Usuario.getByRut(decoded.rut);
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Token inválido: usuario no existe.' });
      }

      if (!usuario.activado) {
        return res.status(403).json({ mensaje: 'El usuario está desactivado o eliminado.' });
      }

      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.id_tipo_usuario)) {
        return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado.' });
      }

      req.usuario = {
        rut: usuario.rut,
        tipo: usuario.id_tipo_usuario
      };

      next();
    } catch (error) {
      console.error('❌ Error al verificar token:', error.message);
      return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
  };
};

module.exports = verifyToken;
