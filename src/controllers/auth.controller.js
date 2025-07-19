// ================================================
// Archivo: auth.controller.js
// Descripción: Lógica para autenticación (login con validación de hash y activación)
// Nota: Los logs de depuración fueron comentados, pueden reactivarse si es necesario.
// ================================================

const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
  // POST /api/auth/login
  async login(req, res) {
    try {
      const { rut, clave } = req.body;

      if (!rut || !clave) {
        // console.log('⚠️ Faltan campos en la solicitud');
        return res.status(400).json({ mensaje: 'Debe ingresar RUT y clave.' });
      }

      const usuario = await Usuario.getByRut(rut);
      if (!usuario) {
        // console.log('❌ Usuario no encontrado para rut:', rut);
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      // Verificar si el usuario está activado
      if (!usuario.activado) {
        return res.status(403).json({ mensaje: 'El usuario está desactivado o eliminado.' });
      }

      // console.log('✅ Usuario encontrado:', usuario);

      const claveBD = typeof usuario.clave === 'string'
        ? usuario.clave
        : usuario.clave.toString();

      // console.log('🔐 Clave enviada:', clave);
      // console.log('🔐 Hash en BD:', claveBD);
      // console.log('🔐 Tipo clave en BD:', typeof claveBD);

      const match = await bcrypt.compare(clave.trim(), claveBD);
      // console.log('🔍 Resultado de bcrypt.compare:', match);

      if (!match) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const token = jwt.sign(
        { rut: usuario.rut, tipo: usuario.id_tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.json({
        mensaje: 'Login exitoso.',
        token,
        usuario: {
          rut: usuario.rut,
          nombre: usuario.nombre,
          tipo: usuario.id_tipo_usuario
        }
      });

    } catch (error) {
      console.error('🧨 Error inesperado en login:', error);
      return res.status(500).json({ mensaje: 'Error interno en login.' });
    }
  }
};

module.exports = AuthController;
