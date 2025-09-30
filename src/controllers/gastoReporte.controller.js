// ===========================================================
// Archivo: gastoReporte.controller.js
// Descripción: Lógica para acciones sobre GastoReporte
// ===========================================================

const fs = require('fs');
const path = require('path');
const GastoReporte = require('../models/gastoReporte.model');

const GastoReporteController = {
  // GET /api/gastos → obtener todos
  async getAll(req, res) {
    try {
      const lista = await GastoReporte.getAll();
      res.json(lista);
    } catch (err) {
      console.error('❌ Error al obtener gastos:', err.message);
      res.status(500).json({ mensaje: 'Error al obtener gastos' });
    }
  },

  // GET /api/gastos/:id → obtener un gasto
  async getById(req, res) {
    try {
      const gasto = await GastoReporte.getById(req.params.id);
      if (!gasto) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json(gasto);
    } catch (err) {
      console.error('❌ Error al obtener gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al obtener gasto' });
    }
  },

  // GET /api/gastos/reporte/:id_reporte → gastos por reporte
  async getByReporte(req, res) {
    try {
      const lista = await GastoReporte.getByReporte(req.params.id_reporte);
      res.json(lista);
    } catch (err) {
      console.error('❌ Error al obtener gastos por reporte:', err.message);
      res.status(500).json({ mensaje: 'Error al obtener gastos por reporte' });
    }
  },

  // POST /api/gastos → crear nuevo gasto
  async create(req, res) {
    try {
      const nuevo = req.body;
      const id = await GastoReporte.create(nuevo);
      res.status(201).json({ mensaje: 'Gasto creado', id });
    } catch (err) {
      console.error('❌ Error al crear gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al crear gasto' });
    }
  },

  // PUT /api/gastos/:id → actualizar gasto
  async update(req, res) {
    try {
      const actualizado = await GastoReporte.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json({ mensaje: 'Gasto actualizado correctamente' });
    } catch (err) {
      console.error('❌ Error al actualizar gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al actualizar gasto' });
    }
  },

  // DELETE /api/gastos/:id → eliminar gasto
  async delete(req, res) {
    try {
      const eliminado = await GastoReporte.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
      res.json({ mensaje: 'Gasto eliminado correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar gasto:', err.message);
      res.status(500).json({ mensaje: 'Error al eliminar gasto' });
    }
  },

  /**
   * POST /api/gastos/upload
   * - Campo de archivo: "file" (usa middleware/upload.js como Evidencias)
   * - Guarda en el mismo directorio de uploads que Evidencias.
   * - Renombra a: GAS_<idReporte>_<idGasto>_<YYYYMMDDhhmmss>.<ext>
   * - Actualiza imagen_url en el registro del gasto.
   */
  async upload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ mensaje: 'No se recibió archivo (campo "file").' });
      }

      const { id_reporte, id_tipo_gasto, monto, fecha_gasto, comentario } = req.body;
      if (!id_reporte || !id_tipo_gasto || !monto || !fecha_gasto) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
      }

      // 1) Crear el gasto para obtener id_gasto
      const id_gasto = await GastoReporte.create({
        id_reporte: Number(id_reporte),
        id_tipo_gasto: Number(id_tipo_gasto),
        monto: Number(monto),
        fecha_gasto,
        comentario: comentario ?? '',
        imagen_url: '', // se completa luego
      });

      // 2) Renombrar archivo a GAS_<idReporte>_<idGasto>_<YYYYMMDDhhmmss>.<ext>
      const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14); // YYYYMMDDhhmmss
      const ext =
        path.extname(req.file.originalname || '') ||
        path.extname(req.file.filename || '') ||
        '.bin';

      const baseDir = req.file.destination || path.dirname(req.file.path);
      const oldPath = req.file.path || path.join(baseDir, req.file.filename);
      const finalName = `GAS_${id_reporte}_${id_gasto}_${stamp}${ext}`;
      const newPath = path.join(baseDir, finalName);

      fs.renameSync(oldPath, newPath);

      // 3) URL pública (asumiendo Nginx sirve /uploads/* → baseDir)
      //    Si tu Nginx mapea /uploads al mismo baseDir, esto funciona:
      const publicUrl = `/uploads/${finalName}`;

      // 4) Actualizar registro con imagen_url
      await GastoReporte.update(id_gasto, { imagen_url: publicUrl });

      return res.status(201).json({
        mensaje: 'Gasto subido',
        id: id_gasto,
        url: publicUrl,
        filename: finalName,
      });
    } catch (err) {
      console.error('❌ Error al subir gasto:', err.message);
      return res.status(500).json({ mensaje: 'Error al subir gasto' });
    }
  },
};

module.exports = GastoReporteController;
