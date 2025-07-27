// ===========================================================
// Archivo: setup.routes.js
// Descripción: Ruta de bootstrap para creación del primer usuario
// ===========================================================
//
// 🔹 Propósito:
//   Esta ruta permite crear un usuario inicial cuando la base de datos está vacía.
//   Es necesaria porque todas las rutas de creación de usuarios están protegidas
//   por `verifyToken`, lo que impide crear el primer usuario sin un token válido.
//
// 🔹 Uso:
//   - Solo funciona si la tabla Usuario está vacía (primer arranque del sistema).
//   - Se debe usar una sola vez para crear el usuario inicial (ej. Supervisor).
//   - Una vez creado, la ruta debe desactivarse comentándola en `server.js`.
//
// 🔹 Seguridad:
//   - No requiere token de autenticación.
//   - Internamente usa el modelo `Usuario.create()`, que aplica bcrypt para
//     encriptar la contraseña, asegurando compatibilidad con el login.
//   - Si ya existe un usuario en la BD, devuelve 403 y no crea nada.
//
// 🔹 Mantenimiento futuro:
//   - Esta ruta es temporal. Comenta la línea de importación y `app.use()` en
//     `server.js` cuando ya no se necesite.
//   - Puede ser útil mantenerla en desarrollo/testing, pero **no debe** estar
//     activa en producción.
//
// ===========================================================

const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model');
const pool = require('../config/db');

// POST /api/setup/usuario-inicial
router.post('/usuario-inicial', async (req, res) => {
  try {
    // Verificar si ya existen usuarios en la tabla
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM Usuario');
    if (rows[0].total > 0) {
      return res.status(403).json({
        mensaje: 'El usuario inicial ya existe. Ruta de setup deshabilitada.'
      });
    }

    const { rut, nombre, apellido_paterno, apellido_materno, email, clave, id_tipo_usuario } = req.body;

    // Crear el usuario inicial usando el modelo (con hash bcrypt automático)
    const id = await Usuario.create({
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      clave,
      id_tipo_usuario,
      activado: true
    });

    return res.status(201).json({
      mensaje: '✅ Usuario inicial creado correctamente.',
      id
    });

  } catch (error) {
    console.error('❌ Error en ruta de usuario-inicial:', error.message);
    return res.status(500).json({ mensaje: 'Error creando usuario inicial.', error: error.message });
  }
});

module.exports = router;
