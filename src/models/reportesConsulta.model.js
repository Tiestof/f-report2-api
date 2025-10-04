/**
 * ============================================================
 * Módulo: src/models/reportesConsulta.model.js
 * Propósito:
 *   - Consulta de Reportes con filtros, paginación y agregados (#evidencias, #gastos).
 *   - Compatible con el esquema real del DDL (Creacion F-REPORT DB V2.sql).
 * ============================================================
 */

const db = require('../config/db');

/**
 * @typedef {Object} ReportesConsultaFilters
 * @property {string=} rut_responsable
 * @property {number=} id_estado_servicio
 * @property {string=} fecha_desde           // YYYY-MM-DD
 * @property {string=} fecha_hasta           // YYYY-MM-DD
 * @property {0|1=}   con_evidencias
 * @property {0|1=}   con_gastos
 * @property {string=} rut_cliente
 * @property {string=} id_rut_empresa_cobro
 * @property {string=} nombre_centro_costo
 */

function buildWhereAndParams(f) {
  const where = [];
  const params = [];

  if (f.rut_responsable) {
    where.push('r.rut_responsable = ?');
    params.push(f.rut_responsable);
  }

  if (Number.isInteger(f.id_estado_servicio)) {
    where.push('r.id_estado_servicio = ?');
    params.push(f.id_estado_servicio);
  }

  if (f.rut_cliente) {
    where.push('r.rut_cliente = ?');
    params.push(f.rut_cliente);
  }

  if (f.id_rut_empresa_cobro) {
    where.push('r.id_rut_empresa_cobro = ?');
    params.push(f.id_rut_empresa_cobro);
  }

  if (f.fecha_desde) {
    where.push('DATE(r.fecha_reporte) >= ?');
    params.push(f.fecha_desde);
  }

  if (f.fecha_hasta) {
    where.push('DATE(r.fecha_reporte) <= ?');
    params.push(f.fecha_hasta);
  }

  if (f.nombre_centro_costo) {
    where.push('cc.nombre_centro_costo LIKE ?');
    params.push(`%${f.nombre_centro_costo}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  return { whereSql, params };
}

/**
 * @returns {Promise<{data: any[], total: number}>}
 */
async function getReportesConsulta(filters, page = 1, pageSize = 25) {
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Number(pageSize) || 25);
  const offset = (p - 1) * ps;

  const { whereSql, params } = buildWhereAndParams(filters);

  // ⚠️ Campos compatibles con el DDL:
  // - Usuario: nombre, apellido_paterno, apellido_materno
  // - EstadoServicio: descripcion
  const selectSql = `
    SELECT
      r.id_reporte,
      DATE(r.fecha_reporte) AS fecha_reporte,
      r.rut_responsable,
      TRIM(CONCAT(
        COALESCE(u.nombre, ''), ' ',
        COALESCE(u.apellido_paterno, ''), ' ',
        COALESCE(u.apellido_materno, '')
      )) AS nombre_responsable,
      r.id_estado_servicio,
      es.descripcion AS estado_servicio,
      r.rut_cliente,
      c.nombre_cliente,
      r.id_rut_empresa_cobro,
      cc.nombre_centro_costo,
      COALESCE(ev.cnt, 0) AS evidencias_count,
      COALESCE(ga.cnt, 0) AS gastos_count
    FROM Reporte r
      LEFT JOIN Usuario       u  ON u.rut = r.rut_responsable
      LEFT JOIN EstadoServicio es ON es.id_estado_servicio = r.id_estado_servicio
      LEFT JOIN Cliente       c  ON c.rut_cliente = r.rut_cliente
      LEFT JOIN CentroCosto   cc ON cc.id_rut_empresa_cobro = r.id_rut_empresa_cobro
      LEFT JOIN (
        SELECT id_reporte, COUNT(*) AS cnt
        FROM EvidenciaReporte
        GROUP BY id_reporte
      ) ev ON ev.id_reporte = r.id_reporte
      LEFT JOIN (
        SELECT id_reporte, COUNT(*) AS cnt
        FROM GastoReporte
        GROUP BY id_reporte
      ) ga ON ga.id_reporte = r.id_reporte
    ${whereSql}
  `;

  const havingConds = [];
  if (filters.con_evidencias === 1 || filters.con_evidencias === '1') {
    havingConds.push('COALESCE(ev.cnt, 0) > 0');
  } else if (filters.con_evidencias === 0 || filters.con_evidencias === '0') {
    havingConds.push('COALESCE(ev.cnt, 0) = 0');
  }

  if (filters.con_gastos === 1 || filters.con_gastos === '1') {
    havingConds.push('COALESCE(ga.cnt, 0) > 0');
  } else if (filters.con_gastos === 0 || filters.con_gastos === '0') {
    havingConds.push('COALESCE(ga.cnt, 0) = 0');
  }

  const havingSql = havingConds.length ? `HAVING ${havingConds.join(' AND ')}` : '';

  const totalSql = `
    SELECT COUNT(*) AS total
    FROM (
      ${selectSql}
      ${havingSql}
    ) sub
  `;

  const dataSql = `
    ${selectSql}
    ${havingSql}
    ORDER BY r.fecha_reporte DESC, r.id_reporte DESC
    LIMIT ? OFFSET ?
  `;

  // ✅ Desestructurar correctamente resultados de mysql2/promise
  const [totalRows] = await db.query(totalSql, params);
  const total = (Array.isArray(totalRows) && totalRows[0] && Number(totalRows[0].total)) ? Number(totalRows[0].total) : 0;

  const [dataRows] = await db.query(dataSql, [...params, ps, offset]);

  return { data: dataRows, total };
}

module.exports = { getReportesConsulta };
