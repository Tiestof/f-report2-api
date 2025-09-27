// ===========================================================
// Archivo: src/controllers/evidenciaReporte.controller.js
// Descripción: Lógica backend para EvidenciaReporte
// Notas:
//  - OJO con la ruta al modelo: ../models/evidenciaReporte.model
//  - create/update/delete delegan al modelo (debe existir en tu v14)
// ===========================================================
const EvidenciaReporte = require('../models/evidenciaReporte.model');

const EvidenciaReporteController = {
  /** Lista todas (uso interno/admin) */
  async getAll(req, res) {
    try {
      const lista = await EvidenciaReporte.getAll();
      res.json(lista);
    } catch (error) {
      console.error('❌ getAll:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener evidencias' });
    }
  },

  /** Obtiene por id */
  async getById(req, res) {
    try {
      const item = await EvidenciaReporte.getById(req.params.id);
      if (!item) return res.status(404).json({ mensaje: 'Evidencia no encontrada' });
      res.json(item);
    } catch (error) {
      console.error('❌ getById:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener evidencia' });
    }
  },

  /** Lista por reporte */
  async getByReporte(req, res) {
    try {
      const lista = await EvidenciaReporte.getByReporte(req.params.id_reporte);
      res.json(lista);
    } catch (error) {
      console.error('❌ getByReporte:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener evidencias del reporte' });
    }
  },

  /** Crea registro (modo JSON; no archivo) */
  async create(req, res) {
    try {
      const id = await EvidenciaReporte.create(req.body);
      res.status(201).json({ mensaje: 'Evidencia creada', id });
    } catch (error) {
      console.error('❌ create:', error.message);
      res.status(500).json({ mensaje: 'Error al crear evidencia' });
    }
  },

  /** Actualiza registro */
  async update(req, res) {
    try {
      const ok = await EvidenciaReporte.update(req.params.id, req.body);
      if (!ok) return res.status(404).json({ mensaje: 'Evidencia no encontrada' });
      res.json({ mensaje: 'Evidencia actualizada' });
    } catch (error) {
      console.error('❌ update:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar evidencia' });
    }
  },

  /** Elimina registro */
  async delete(req, res) {
    try {
      const ok = await EvidenciaReporte.delete(req.params.id);
      if (!ok) return res.status(404).json({ mensaje: 'Evidencia no encontrada' });
      res.json({ mensaje: 'Evidencia eliminada' });
    } catch (error) {
      console.error('❌ delete:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar evidencia' });
    }
  },

  /**
   * Subida de archivo (multipart + Multer)
   * POST /api/evidencias/upload (field name: "file")
   * Guarda archivo como /uploads/EVI_<reporte>_<tipo>_<YYYYMMDDhhmmss>.<ext>
   * Inserta registro en EvidenciaReporte con url pública.
   */
  async upload(req, res) {
    try {
      const {
        id_reporte,
        id_tipo_evidencia,
        // opcionales (no-firma)
        modelo,
        numero_serie,
        ipv4,
        ipv6,
        macadd,
        nombre_maquina,
        // opcional: para firma digital (nombre del firmante)
        firmante,
      } = req.body;

      if (!req.file) return res.status(400).json({ mensaje: 'No se recibió archivo.' });
      if (!id_reporte) return res.status(400).json({ mensaje: 'id_reporte es obligatorio.' });

      // URL pública servida por Nginx: /uploads/*
      const url = `/uploads/${req.file.filename}`;

      const nueva = {
        id_reporte: Number(id_reporte),
        id_tipo_evidencia: id_tipo_evidencia ? Number(id_tipo_evidencia) : null,
        url,
        // Si viene firmante, priorízalo como "modelo" (ajústalo si prefieres otro campo)
        modelo: (firmante && String(firmante)) || (modelo ?? null) || null,
        numero_serie: numero_serie ?? null,
        ipv4: ipv4 ?? null,
        ipv6: ipv6 ?? null,
        macadd: macadd ?? null,
        nombre_maquina: nombre_maquina ?? null,
      };

      const id = await EvidenciaReporte.create(nueva);
      res.status(201).json({ mensaje: 'Evidencia subida', id, url });
    } catch (error) {
      console.error('❌ upload:', error.message);
      res.status(500).json({ mensaje: 'Error al subir evidencia' });
    }
  },
};

module.exports = EvidenciaReporteController;
