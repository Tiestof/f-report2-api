// ============================================================
// Archivo: src/controllers/gastoReporte.controller.js
// Descripción: Controlador REST para GastoReporte
// Claves:
//  - upload(): crea el gasto con metadatos, renombra el archivo,
//    y actualiza SOLO imagen_url para evitar nulificar otras columnas.
//  - Exports con alias compatibles para evitar "handler undefined" en rutas.
// ============================================================

const path = require('path');
const fs = require('fs');
const GastoReporte = require('../models/gastoReporte.model');

async function list(req, res) {
  try {
    const data = await GastoReporte.getAll();
    res.json(data);
  } catch (err) {
    console.error('Error al listar gastos:', err);
    res.status(500).json({ mensaje: 'Error al listar gastos' });
  }
}

async function getById(req, res) {
  try {
    const data = await GastoReporte.getById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
    res.json(data);
  } catch (err) {
    console.error('Error al obtener gasto:', err);
    res.status(500).json({ mensaje: 'Error al obtener gasto' });
  }
}

async function getByReporte(req, res) {
  try {
    const data = await GastoReporte.getByReporte(req.params.idReporte);
    res.json(data);
  } catch (err) {
    console.error('Error al obtener gastos por reporte:', err);
    res.status(500).json({ mensaje: 'Error al obtener gastos por reporte' });
  }
}

async function create(req, res) {
  try {
    const { id_reporte, id_tipo_gasto, monto, comentario = '', fecha_gasto } = req.body;
    if (!id_reporte || !id_tipo_gasto || !monto || !fecha_gasto) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }
    const id = await GastoReporte.create({
      id_reporte: Number(id_reporte),
      id_tipo_gasto: Number(id_tipo_gasto),
      monto: Number(monto),
      comentario,
      fecha_gasto,
      imagen_url: '',
    });
    res.status(201).json({ id });
  } catch (err) {
    console.error('Error al crear gasto:', err);
    res.status(500).json({ mensaje: 'Error al crear gasto' });
  }
}

async function update(req, res) {
  try {
    const ok = await GastoReporte.update(req.params.id, req.body || {});
    if (!ok) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
    res.json({ mensaje: 'Gasto actualizado' });
  } catch (err) {
    console.error('Error al actualizar gasto:', err);
    res.status(500).json({ mensaje: 'Error al actualizar gasto' });
  }
}

async function remove(req, res) {
  try {
    const ok = await GastoReporte.delete(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: 'Gasto no encontrado' });
    res.json({ mensaje: 'Gasto eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar gasto:', err);
    res.status(500).json({ mensaje: 'Error al eliminar gasto' });
  }
}

/**
 * POST /api/gastos/upload
 * Requiere: id_reporte, id_tipo_gasto, monto, fecha_gasto (+ comentario opcional) y file
 * Flujo:
 *  1) Crear gasto con metadatos → id_gasto
 *  2) Renombrar archivo a GAS_<idReporte>_<idGasto>_<YYYYMMDDhhmmss>.<ext>
 *  3) Actualizar SOLO imagen_url
 */
async function upload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se recibió archivo (campo "file").' });
    }

    const { id_reporte, id_tipo_gasto, monto, fecha_gasto, comentario } = req.body;
    if (!id_reporte || !id_tipo_gasto || !monto || !fecha_gasto) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    // 1) Crear el gasto con los datos del formulario
    const id_gasto = await GastoReporte.create({
      id_reporte: Number(id_reporte),
      id_tipo_gasto: Number(id_tipo_gasto),
      monto: Number(monto),
      fecha_gasto,
      comentario: comentario ?? '',
      imagen_url: '',
    });

    // 2) Renombrado
    const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
    const ext = path.extname(req.file.originalname || req.file.filename || '') || '.bin';
    const baseDir = req.file.destination || path.dirname(req.file.path);
    const oldPath = req.file.path || path.join(baseDir, req.file.filename);
    const finalName = `GAS_${id_reporte}_${id_gasto}_${stamp}${ext}`;
    const newPath = path.join(baseDir, finalName);
    fs.renameSync(oldPath, newPath);

    const publicUrl = `/uploads/${finalName}`;

    // 3) Solo URL
    await GastoReporte.updateImagenUrl(id_gasto, publicUrl);

    return res.status(201).json({ mensaje: 'Gasto subido', id: id_gasto, url: publicUrl });
  } catch (err) {
    console.error('Error en upload de gasto:', err);
    res.status(500).json({ mensaje: 'Error al subir archivo de gasto' });
  }
}

module.exports = {
  // principales
  list,
  getById,
  getByReporte,
  create,
  update,
  delete: remove,
  upload,
  // alias por compatibilidad (por si en algún sitio se usa el nombre antiguo)
  getAllGastos: list,
  getGastoById: getById,
  getGastosByReporte: getByReporte,
  createGasto: create,
  updateGasto: update,
  deleteGasto: remove,
  uploadGasto: upload,
};
