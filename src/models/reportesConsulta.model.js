/**
 * ============================================================
 * Módulo: src/models/reportesConsulta.model.js
 * Propósito:
 *   - Proveer funciones de acceso a datos para la consulta de Reportes
 *     con filtros server-side, paginación y agregados (#evidencias, #gastos).
 *   - Evitar N+1 realizando los conteos vía subconsultas/LEFT JOIN.
 *
 * Contexto:
 *   - Endpoint objetivo: GET /api/reportes/consulta
 *   - Filtros (opcionales): rut_responsable, id_estado_servicio,
 *       fecha_desde, fecha_hasta, con_evidencias (0|1), con_gastos (0|1),
 *       rut_cliente, id_rut_empresa_cobro, nombre_centro_costo (LIKE).
 *   - Paginación: page (>=1), pageSize (>=1). Orden por fecha_reporte DESC.
 *
 * Seguridad:
 *   - Todas las variables se parametrizan (placeholders) para evitar SQL injection.
 *
 * Rendimiento:
 *   - Recomendado tener índices en:
 *       Reporte(fecha_reporte), Reporte(rut_responsable), Reporte(id_estado_servicio),
 *       Reporte(rut_cliente), Reporte(id_rut_empresa_cobro),
 *       CentroCosto(nombre_centro_costo) si se usa LIKE frecuente.
 *
 * TODO:
 *   - Medir tiempos de respuesta en rangos grandes y considerar cubrir
 *     esta consulta con vistas/materialized views si la volumetría crece.
 *   - Si se requieren más campos descriptivos, agregar los JOINs mínimos al SELECT.
 * ============================================================
 */

const db = require('../config/db'); // Asegúrate de tener el pool MySQL exportado aquí

/**
 * @typedef {Object} ReportesConsultaFilters
 * @property {string=} rut_responsable
 * @property {number=} id_estado_servicio
 * @property {string=} fecha_desde           - Formato YYYY-MM-DD
 * @property {string=} fecha_hasta           - Formato YYYY-MM-DD
 * @property {0|1=}   con_evidencias
 * @property {0|1=}   con_gastos
 * @property {string=} rut_cliente
 * @property {string=} id_rut_empresa_cobro
 * @property {string=} nombre_centro_costo   - Búsqueda por nombre (LIKE %...%)
 */

/**
 * Construye cláusulas WHERE y la lista de parámetros para los filtros.
 * NO incluye las condiciones de conteos (con_evidencias / con_gastos).
 * Esas se aplican luego sobre las columnas agregadas (COALESCE(ev.cnt,0), COALESCE(ga.cnt,0)).
 *
 * @param {ReportesConsultaFilters} f
 * @returns {{ whereSql: string, params: any[] }}
 */
function buildWhereAndParams(f) {
  const where = [];
  const params = [];

  // Filtros directos por igualdad
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

  // Rango de fechas por DATE(fecha_reporte)
  // Nota: asumimos que r.fecha_reporte es DATE o DATETIME consistente con el proyecto
  if (f.fecha_desde) {
    where.push('DATE(r.fecha_reporte) >= ?');
    params.push(f.fecha_desde);
  }

  if (f.fecha_hasta) {
    where.push('DATE(r.fecha_reporte) <= ?');
    params.push(f.fecha_hasta);
  }

  // Búsqueda por nombre de centro de costo (LIKE)
  if (f.nombre_centro_costo) {
    where.push('cc.nombre_centro_costo LIKE ?');
    params.push(`%${f.nombre_centro_costo}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  return { whereSql, params };
}

/**
 * Ejecuta la consulta paginada con filtros y devuelve:
 *  - data: filas con agregados (evidencias_count, gastos_count)
 *  - total: total de filas sin LIMIT/OFFSET (para paginación)
 *
 * @param {ReportesConsultaFilters} filters
 * @param {number} page      - Página (>=1)
 * @param {number} pageSize  - Tamaño de página (>=1)
 * @returns {Promise<{data: any[], total: number}>}
 */
async function getReportesConsulta(filters, page = 1, pageSize = 25) {
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Number(pageSize) || 25);
  const offset = (p - 1) * ps;

  // 1) WHERE principal (sin condiciones de conteos)
  const { whereSql, params } = buildWhereAndParams(filters);

  // 2) SELECT con agregados (LEFT JOIN a subconsultas de conteo)
  //    - NOTA: usamos COALESCE para considerar 0 cuando no hay registros relacionados.
  const selectSql = `
    SELECT
      r.id_reporte,
      DATE(r.fecha_reporte)              AS fecha_reporte,
      r.rut_responsable,
      CONCAT(COALESCE(u.nombres, ''), ' ', COALESCE(u.apellidos, '')) AS nombre_responsable,
      r.id_estado_servicio,
      es.descripcion_estado             AS estado_servicio,
      r.rut_cliente,
      c.nombre_cliente,
      r.id_rut_empresa_cobro,
      cc.nombre_centro_costo,
      COALESCE(ev.cnt, 0)               AS evidencias_count,
      COALESCE(ga.cnt, 0)               AS gastos_count
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

  // 3) Condiciones sobre agregados (con_evidencias / con_gastos)
  //    Estas deben aplicarse DESPUÉS de haber hecho los LEFT JOIN de conteos.
  const havingConds = [];
  const havingParams = [];

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

  // 4) Orden, límite y desplazamiento (paginación)
  //    - Orden por fecha_reporte DESC como default de negocio.
  const orderLimitSql = `
    ORDER BY r.fecha_reporte DESC, r.id_reporte DESC
    LIMIT ? OFFSET ?
  `;

  // 5) Query total: usamos el mismo SELECT base envolviéndolo para contar
  const totalSql = `
    SELECT COUNT(*) AS total FROM (
      ${selectSql}
      ${havingSql}
    ) AS sub
  `;

  // 6) Query data: SELECT + HAVING + ORDER/LIMIT/OFFSET
  const dataSql = `
      ${selectSql}
      ${havingSql}
      ${orderLimitSql}
  `;

  // 7) Ejecutar: primero total, luego los datos
  //    - params se reusa (where) y no hay params en HAVING porque usamos expresiones literales.
  //    - agregamos LIMIT/OFFSET al final del arreglo para data.
  const totalRows = await db.query(totalSql, params);
  const total = Array.isArray(totalRows) && totalRows[0] && totalRows[0].total
    ? Number(totalRows[0].total)
    : 0;

  const dataRows = await db.query(dataSql, [...params, ps, offset]);

  return { data: dataRows, total };
}

module.exports = {
  getReportesConsulta,
};
