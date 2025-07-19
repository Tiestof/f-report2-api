// ===========================================================
// Archivo: models/usuario.model.js
// Descripción: Acceso a BD para tabla Usuario
// ===========================================================

const pool = require('../config/db');
const bcrypt = require('bcrypt');

const UsuarioModel = {
  // Buscar usuario por RUT
  async getByRut(rut) {
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE rut = ?', [rut]);
    return rows[0];
  },

  // Listar todos los usuarios
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Usuario');
    return rows;
  },

  // Crear nuevo usuario (con encriptación de clave)
  async create(data) {
    const {
      rut,
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      clave,
      id_tipo_usuario,
      activado
    } = data;

    const hashedClave = await bcrypt.hash(clave, 10);

    const [result] = await pool.query(
      `INSERT INTO Usuario 
        (rut, nombre, apellido_paterno, apellido_materno, email, clave, id_tipo_usuario, activado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [rut, nombre, apellido_paterno, apellido_materno, email, hashedClave, id_tipo_usuario, activado]
    );

    return result.insertId;
  },

  // Actualizar usuario (si viene una nueva clave, también se encripta)
  async update(rut, data) {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      id_tipo_usuario,
      activado,
      clave
    } = data;

    let query = `UPDATE Usuario SET 
      nombre = ?, 
      apellido_paterno = ?, 
      apellido_materno = ?, 
      email = ?, 
      id_tipo_usuario = ?, 
      activado = ?`;
    
    const valores = [nombre, apellido_paterno, apellido_materno, email, id_tipo_usuario, activado];

    if (clave) {
      const hashedClave = await bcrypt.hash(clave, 10);
      query += `, clave = ?`;
      valores.push(hashedClave);
    }

    query += ` WHERE rut = ?`;
    valores.push(rut);

    const [result] = await pool.query(query, valores);
    return result.affectedRows > 0;
  },

  // Eliminar usuario
  async delete(rut) {
    const [result] = await pool.query('DELETE FROM Usuario WHERE rut = ?', [rut]);
    return result.affectedRows > 0;
  }
};

module.exports = UsuarioModel;
