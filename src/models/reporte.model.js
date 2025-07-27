// ===========================================================
// Archivo: models/reporte.model.js
// Descripción: Acceso a BD para tabla Reporte
// ===========================================================

const pool = require('../config/db');

const ReporteModel = {
  // Obtener todos los reportes con joins para mostrar información descriptiva
  async getAll() {
    const [rows] = await pool.query(`
      SELECT r.*, u.nombre AS nombre_usuario, c.nombre_cliente, ts.descripcion AS tipo_servicio,
             th.descripcion AS tipo_hardware, so.nombre_sistema, es.descripcion AS estado_servicio
      FROM Reporte r
      LEFT JOIN Usuario u ON r.rut_usuario = u.rut
      LEFT JOIN Cliente c ON r.rut_cliente = c.rut_cliente
      LEFT JOIN TipoServicio ts ON r.id_tipo_servicio = ts.id_tipo_servicio
      LEFT JOIN TipoHardware th ON r.id_tipo_hardware = th.id_tipo_hardware
      LEFT JOIN SistemaOperativo so ON r.id_sistema_operativo = so.id_sistema_operativo
      LEFT JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
    `);
    return rows;
  },

  // Obtener un reporte específico
  async getById(id) {
    const [rows] = await pool.query(`
      SELECT r.*, u.nombre AS nombre_usuario, c.nombre_cliente, ts.descripcion AS tipo_servicio,
             th.descripcion AS tipo_hardware, so.nombre_sistema, es.descripcion AS estado_servicio
      FROM Reporte r
      LEFT JOIN Usuario u ON r.rut_usuario = u.rut
      LEFT JOIN Cliente c ON r.rut_cliente = c.rut_cliente
      LEFT JOIN TipoServicio ts ON r.id_tipo_servicio = ts.id_tipo_servicio
      LEFT JOIN TipoHardware th ON r.id_tipo_hardware = th.id_tipo_hardware
      LEFT JOIN SistemaOperativo so ON r.id_sistema_operativo = so.id_sistema_operativo
      LEFT JOIN EstadoServicio es ON r.id_estado_servicio = es.id_estado_servicio
      WHERE r.id_reporte = ?
    `, [id]);
    return rows[0];
  },

  // Crear nuevo reporte
  async create(data) {
    const {
      fecha_reporte, comentario, hora_inicio, hora_fin, direccion, numero,
      rut_usuario, rut_responsable, rut_cliente,
      id_tipo_servicio, id_tipo_hardware, id_sistema_operativo, id_estado_servicio,
      sector, edificio, piso, latitud, longitud, id_rut_empresa_cobro
    } = data;

    const [result] = await pool.query(`
      INSERT INTO Reporte (
        fecha_reporte, comentario, hora_inicio, hora_fin, direccion, numero,
        rut_usuario, rut_responsable, rut_cliente,
        id_tipo_servicio, id_tipo_hardware, id_sistema_operativo, id_estado_servicio,
        sector, edificio, piso, latitud, longitud, id_rut_empresa_cobro
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      fecha_reporte, comentario, hora_inicio, hora_fin, direccion, numero,
      rut_usuario, rut_responsable, rut_cliente,
      id_tipo_servicio, id_tipo_hardware, id_sistema_operativo, id_estado_servicio,
      sector, edificio, piso, latitud, longitud, id_rut_empresa_cobro
    ]);

    return result.insertId;
  },

  // Actualizar reporte
  async update(id, data) {
    const {
      fecha_reporte, comentario, hora_inicio, hora_fin, direccion, numero,
      rut_usuario, rut_responsable, rut_cliente,
      id_tipo_servicio, id_tipo_hardware, id_sistema_operativo, id_estado_servicio,
      sector, edificio, piso, latitud, longitud, id_rut_empresa_cobro
    } = data;

    const [result] = await pool.query(`
      UPDATE Reporte SET 
        fecha_reporte = ?, comentario = ?, hora_inicio = ?, hora_fin = ?, direccion = ?, numero = ?,
        rut_usuario = ?, rut_responsable = ?, rut_cliente = ?,
        id_tipo_servicio = ?, id_tipo_hardware = ?, id_sistema_operativo = ?, id_estado_servicio = ?,
        sector = ?, edificio = ?, piso = ?, latitud = ?, longitud = ?, id_rut_empresa_cobro = ?
      WHERE id_reporte = ?
    `, [
      fecha_reporte, comentario, hora_inicio, hora_fin, direccion, numero,
      rut_usuario, rut_responsable, rut_cliente,
      id_tipo_servicio, id_tipo_hardware, id_sistema_operativo, id_estado_servicio,
      sector, edificio, piso, latitud, longitud, id_rut_empresa_cobro, id
    ]);

    return result.affectedRows > 0;
  },

  // Eliminar reporte
  async delete(id) {
    const [result] = await pool.query('DELETE FROM Reporte WHERE id_reporte = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ReporteModel;
