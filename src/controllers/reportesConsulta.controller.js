/**
 * ============================================================
 * Controlador: src/controllers/reportesConsulta.controller.js
 * Propósito:
 *   - Exponer el handler HTTP para GET /api/reportes/consulta
 *   - Validar y normalizar query params
 *   - Invocar al modelo con filtros y paginación
 *   - Responder en un formato consistente: { data, page, pageSize, total }
 *
 * Puntos clave:
 *   - Server-side filters bajo demanda (no carga nada sin filtros del usuario)
 *   - Paginación con defaults seguros y límites máximos
 *   - Validación estricta de parámetros (evitar 500 por inputs mal formateados)
 *
 * Seguridad:
 *   - No se expone SQL ni detalles internos en mensajes de error.
 *   - Se validan tipos y rangos básicos de los params.
 *
 * TODO:
 *   - Integrar un logger centralizado (winston/pino) para trazabilidad.
 *   - Internacionalizar mensajes de error si se requiere.
 * ============================================================
 */

const { getReportesConsulta } = require('../models/reportesConsulta.model');

// --- Utilidades locales (sin dependencias externas) ---

/** Valida 'YYYY-MM-DD' estrictamente */
function isISODateYYYYMMDD(value) {
  if (typeof value !== 'string') return false;
  const re = /^(\d{4})-(\d{2})-(\d{2})$/;
  const m = value.match(re);
  if (!m) return false;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  // Chequeo de rango básico y Date real
  const dt = new Date(value + 'T00:00:00Z');
  return (
    dt instanceof Date &&
    !isNaN(dt.getTime()) &&
    y >= 1970 &&
    mo >= 1 &&
    mo <= 12 &&
    d >= 1 &&
    d <= 31
  );
}

/** Convierte string "0"/"1" a 0|1 o undefined */
function parseBinaryFlag(v) {
  if (v === undefined) return undefined;
  if (v === '0' || v === 0) return 0;
  if (v === '1' || v === 1) return 1;
  return null; // inválido
}

/** Convierte a entero seguro con fallback */
function toIntOr(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * GET /api/reportes/consulta
 * Query params (todos opcionales):
 *  - rut_responsable: string
 *  - id_estado_servicio: number
 *  - fecha_desde: 'YYYY-MM-DD'
 *  - fecha_hasta: 'YYYY-MM-DD'
 *  - con_evidencias: 0|1
 *  - con_gastos: 0|1
 *  - rut_cliente: string
 *  - id_rut_empresa_cobro: string
 *  - nombre_centro_costo: string (LIKE)
 *  - page: number (>=1)         [default 1]
 *  - pageSize: number (1..100)  [default 15]  ← pensado para la grilla de 15 filas
 */
async function getReportesConsultaHandler(req, res) {
  try {
    const {
      rut_responsable,
      id_estado_servicio,
      fecha_desde,
      fecha_hasta,
      con_evidencias,
      con_gastos,
      rut_cliente,
      id_rut_empresa_cobro,
      nombre_centro_costo,
      page,
      pageSize,
    } = req.query;

    // --- Validaciones básicas de formato ---
    // id_estado_servicio (entero)
    let estadoInt;
    if (id_estado_servicio !== undefined) {
      estadoInt = toIntOr(id_estado_servicio, NaN);
      if (!Number.isInteger(estadoInt)) {
        return res.status(400).json({
          error: 'Parámetro inválido: id_estado_servicio debe ser entero.',
        });
      }
    }

    // Fechas en ISO 'YYYY-MM-DD'
    if (fecha_desde !== undefined && !isISODateYYYYMMDD(fecha_desde)) {
      return res.status(400).json({
        error: "Parámetro inválido: fecha_desde debe tener formato 'YYYY-MM-DD'.",
      });
    }
    if (fecha_hasta !== undefined && !isISODateYYYYMMDD(fecha_hasta)) {
      return res.status(400).json({
        error: "Parámetro inválido: fecha_hasta debe tener formato 'YYYY-MM-DD'.",
      });
    }

    // Flags binarios 0|1
    const evidFlag = parseBinaryFlag(con_evidencias);
    if (con_evidencias !== undefined && evidFlag === null) {
      return res.status(400).json({
        error: 'Parámetro inválido: con_evidencias debe ser 0 o 1.',
      });
    }

    const gastFlag = parseBinaryFlag(con_gastos);
    if (con_gastos !== undefined && gastFlag === null) {
      return res.status(400).json({
        error: 'Parámetro inválido: con_gastos debe ser 0 o 1.',
      });
    }

    // Paginación: defaults y límites
    const pageNum = Math.max(1, toIntOr(page, 1));
    // Default 15 por requerimiento de grilla; límite superior 100 para evitar abusos
    const pageSizeNum = Math.min(100, Math.max(1, toIntOr(pageSize, 15)));

    // --- Construcción del objeto de filtros normalizado ---
    const filters = {
      rut_responsable: typeof rut_responsable === 'string' && rut_responsable.trim() ? rut_responsable.trim() : undefined,
      id_estado_servicio: Number.isInteger(estadoInt) ? estadoInt : undefined,
      fecha_desde: fecha_desde || undefined,
      fecha_hasta: fecha_hasta || undefined,
      con_evidencias: evidFlag !== null ? evidFlag : undefined,
      con_gastos: gastFlag !== null ? gastFlag : undefined,
      rut_cliente: typeof rut_cliente === 'string' && rut_cliente.trim() ? rut_cliente.trim() : undefined,
      id_rut_empresa_cobro: typeof id_rut_empresa_cobro === 'string' && id_rut_empresa_cobro.trim() ? id_rut_empresa_cobro.trim() : undefined,
      nombre_centro_costo: typeof nombre_centro_costo === 'string' && nombre_centro_costo.trim() ? nombre_centro_costo.trim() : undefined,
    };

    // --- Invocar al modelo ---
    const { data, total } = await getReportesConsulta(filters, pageNum, pageSizeNum);

    // --- Respuesta OK ---
    // Nota: la UI mostrará un máximo de 15 filas en la grilla y scrollbar;
    // aquí devolvemos la página solicitada (por defecto 15) y el total.
    return res.status(200).json({
      data,
      page: pageNum,
      pageSize: pageSizeNum,
      total,
    });
  } catch (err) {
    // Logger centralizado si existe, sino console.error
    // eslint-disable-next-line no-console
    console.error('GET /api/reportes/consulta error:', err && err.message ? err.message : err);

    return res.status(500).json({
      error: 'Error interno al consultar reportes.',
    });
  }
}

module.exports = {
  getReportesConsultaHandler,
};
