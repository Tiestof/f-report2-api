// ===========================================================
// Archivo: models/tareasReporte.model.js
// Descripción: Acceso a BD para tabla Tareas_Reporte
// ===========================================================

const pool = require('../config/db');

const TareasReporteModel = {
  // Obtener todas las tareas con join a TipoTarea y Usuario
  async getAll() {
    const [rows] = await pool.query(`
      SELECT t.*, tt.descripcion_tipo_tarea, u.nombre AS nombre_usuario
      FROM Tareas_Reporte t
      LEFT JOIN TipoTarea tt ON t.id_tipo_tarea = tt.id_tipo_tarea
      LEFT JOIN Usuario u ON t.rut_usuario = u.rut
    `);
    return rows;
  },

  // Obtener una tarea por ID
  async getById(id) {
    const [rows] = await pool.query(`
      SELECT t.*, tt.descripcion_tipo_tarea, u.nombre AS nombre_usuario
      FROM Tareas_Reporte t
      LEFT JOIN TipoTarea tt ON t.id_tipo_tarea = tt.id_tipo_tarea
      LEFT JOIN Usuario u ON t.rut_usuario = u.rut
      WHERE t.id_tarea = ?
    `, [id]);
    return rows[0];
  },

  // Obtener tareas de un reporte específico
  async getByReporte(id_reporte) {
    const [rows] = await pool.query(`
      SELECT t.*, tt.descripcion_tipo_tarea, u.nombre AS nombre_usuario
      FROM Tareas_Reporte t
      LEFT JOIN TipoTarea tt ON t.id_tipo_tarea = tt.id_tipo_tarea
      LEFT JOIN Usuario u ON t.rut_usuario = u.rut
      WHERE t.id_reporte = ?
    `, [id_reporte]);
    return rows;
  },

  // Crear nueva tarea
  async create(data) {
    const { id_reporte, id_tipo_tarea, rut_usuario, comentario, estado_tarea } = data;
    const [result] = await pool.query(`
      INSERT INTO Tareas_Reporte (id_reporte, id_tipo_tarea, rut_usuario, comentario, estado_tarea)
      VALUES (?, ?, ?, ?, ?)
    `, [id_reporte, id_tipo_tarea, rut_usuario, comentario, estado_tarea]);
    return result.insertId;
  },

  // Actualizar tarea existente
  async update(id_tarea, data) {
    const { id_tipo_tarea, rut_usuario, comentario, estado_tarea } = data;
    const [result] = await pool.query(`
      UPDATE Tareas_Reporte 
      SET id_tipo_tarea = ?, rut_usuario = ?, comentario = ?, estado_tarea = ?
      WHERE id_tarea = ?
    `, [id_tipo_tarea, rut_usuario, comentario, estado_tarea, id_tarea]);
    return result.affectedRows > 0;
  },

  // Eliminar tarea
  async delete(id_tarea) {
    const [result] = await pool.query('DELETE FROM Tareas_Reporte WHERE id_tarea = ?', [id_tarea]);
    return result.affectedRows > 0;
  }
};

module.exports = TareasReporteModel;
