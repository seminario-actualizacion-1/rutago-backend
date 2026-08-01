#!/usr/bin/env node
/**
 * Migración única: MySQL → PostgreSQL
 *
 * Lee datos desde MySQL y los inserta en PostgreSQL.
 * Es 100% idempotente (ON CONFLICT DO NOTHING).
 * Si MySQL no está disponible, se salta sin error.
 *
 * Variables de entorno para MySQL (opcionales):
 *   MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB
 *   Si no se definen, usa valores por defecto (localhost:3306, root, sqz991711, rutago_db).
 */
"use strict";

const { Pool } = require("pg");
const mysql = require("mysql2/promise");
const path = require("path");

// ─── PostgreSQL desde .env ───────────────────────────────────────────
let config;
try {
  config = require("../src/config");
} catch (e) {
  console.error("No se pudo cargar config:", e.message);
  process.exit(1);
}

const pgPool = new Pool({
  host: config.db.host,
  port: parseInt(config.db.puerto),
  user: config.db.usuario,
  password: config.db.password,
  database: config.db.nombre,
});

async function pg(sql, params = []) {
  return pgPool.query(sql, params);
}

// ─── MySQL ───────────────────────────────────────────────────────────
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || "3306", 10);
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASS = process.env.MYSQL_PASSWORD || "sqz991711";
const MYSQL_DB = process.env.MYSQL_DB || "rutago_db";

let mysqlConn = null;

async function conectarMySQL() {
  try {
    mysqlConn = await mysql.createConnection({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DB,
    });
    console.log("✓ Conectado a MySQL en", MYSQL_HOST + ":" + MYSQL_PORT);
    return true;
  } catch (err) {
    console.log(
      "! MySQL no disponible (" +
        err.code +
        "). Se omite migración de datos históricos.",
    );
    return false;
  }
}

async function loadMySQL(table) {
  if (!mysqlConn) return [];
  const [rows] = await mysqlConn.query("SELECT * FROM `" + table + "`");
  return rows;
}

// ─── Migración ───────────────────────────────────────────────────────
async function migrar() {
  console.log("");
  console.log("========================================");
  console.log(" Migración MySQL → PostgreSQL");
  console.log("========================================");
  console.log("");

  const disponible = await conectarMySQL();
  if (!disponible) {
    await pgPool.end();
    return;
  }

  // Cargar datos desde MySQL
  const usuarios = await loadMySQL("usuarios");
  const roles = await loadMySQL("roles");
  const comunas = await loadMySQL("comunas");
  const barrios = await loadMySQL("barrios");
  const tiposDocumento = await loadMySQL("tiposdocumento");
  const estadosConductor = await loadMySQL("estadosconductor");
  const estadosVehiculo = await loadMySQL("estadosvehiculo");
  const estadosViaje = await loadMySQL("estadosviaje");
  const perfilConductores = await loadMySQL("perfilconductors");
  const perfilEntidades = await loadMySQL("perfilentidads");
  const perfilPasajeros = await loadMySQL("perfilpasajeros");
  const vehiculos = await loadMySQL("vehiculos");
  const rutas = await loadMySQL("rutas");
  const horarios = await loadMySQL("horarios");
  const viajes = await loadMySQL("viajes");
  const viajePasajeros = await loadMySQL("viajepasajeros");

  console.log("Datos cargados:");
  console.log(
    "  Roles:",
    roles.length,
    "| Usuarios:",
    usuarios.length,
    "| Comunas:",
    comunas.length,
    "| Barrios:",
    barrios.length,
  );
  console.log(
    "  Conductores:",
    perfilConductores.length,
    "| Entidades:",
    perfilEntidades.length,
    "| Pasajeros:",
    perfilPasajeros.length,
  );
  console.log(
    "  Vehiculos:",
    vehiculos.length,
    "| Rutas:",
    rutas.length,
    "| Horarios:",
    horarios.length,
  );
  console.log(
    "  Viajes:",
    viajes.length,
    "| ViajePasajeros:",
    viajePasajeros.length,
  );
  console.log("");

  // Mapeos
  const usuarioAConductor = {};
  for (const c of perfilConductores) usuarioAConductor[c.usuarioId] = c.id;
  const usuarioAPasajero = {};
  for (const p of perfilPasajeros) usuarioAPasajero[p.usuarioId] = p.id;
  const horarioAVehiculo = {};
  for (const h of horarios) horarioAVehiculo[h.id] = h.vehiculoId;

  // ── Catálogos ──────────────────────────────────────────
  console.log("Roles...");
  for (const r of roles) {
    await pg(
      'INSERT INTO "Roles" (id, "nombreRol", descripcion, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [r.id, r.nombreRol, r.descripcion || null, r.createdAt, r.updatedAt],
    );
  }

  console.log("EstadosConductor...");
  for (const e of estadosConductor) {
    await pg(
      'INSERT INTO "EstadosConductor" (id, nombre, descripcion, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [e.id, e.nombre, e.descripcion || null, e.createdAt, e.updatedAt],
    );
  }

  console.log("EstadosVehiculo...");
  for (const e of estadosVehiculo) {
    await pg(
      'INSERT INTO "EstadosVehiculo" (id, nombre, descripcion, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [e.id, e.nombre, e.descripcion || null, e.createdAt, e.updatedAt],
    );
  }

  console.log("EstadosViaje...");
  for (const e of estadosViaje) {
    await pg(
      'INSERT INTO "EstadosViaje" (id, nombre, descripcion, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [e.id, e.nombre, e.descripcion || null, e.createdAt, e.updatedAt],
    );
  }

  console.log("TiposDocumento...");
  for (const t of tiposDocumento) {
    await pg(
      'INSERT INTO "TiposDocumento" (id, nombre, descripcion, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [t.id, t.nombre, t.descripcion || null, t.createdAt, t.updatedAt],
    );
  }

  console.log("Comunas...");
  for (const c of comunas) {
    await pg(
      'INSERT INTO "Comunas" (id, nombre, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING',
      [c.id, c.nombre, c.createdAt, c.updatedAt],
    );
  }

  console.log("Barrios...");
  for (const b of barrios) {
    await pg(
      'INSERT INTO "Barrios" (id, nombre, "comunaId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [b.id, b.nombre, b.comunaId || null, b.createdAt, b.updatedAt],
    );
  }

  // ── Usuarios ───────────────────────────────────────────
  console.log("Usuarios...");
  for (const u of usuarios) {
    await pg(
      'INSERT INTO "Usuarios" (id, nombres, apellidos, correo, contrasena, "rolId", "resetPasswordToken", "resetPasswordExpires", activo, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (id) DO NOTHING',
      [
        u.id,
        u.nombres,
        u.apellidos,
        u.correo,
        u.contrasena,
        u.rolId,
        u.resetPasswordToken || null,
        u.resetPasswordExpires || null,
        true,
        u.createdAt,
        u.updatedAt,
      ],
    );
  }

  // ── Perfiles ───────────────────────────────────────────
  console.log("Conductores...");
  for (const c of perfilConductores) {
    await pg(
      'INSERT INTO "Conductores" (id, "usuarioId", "licenciaConducir", "estadoId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING',
      [
        c.id,
        c.usuarioId,
        c.licenciaConducir || null,
        c.estadoId || null,
        c.createdAt,
        c.updatedAt,
      ],
    );
  }

  console.log("Entidades...");
  for (const e of perfilEntidades) {
    await pg(
      'INSERT INTO "Entidades" (id, "usuarioId", "razonSocial", nit, "telefonoContacto", direccion, correo, "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING',
      [
        e.id,
        e.usuarioId,
        e.razonSocial || null,
        e.nit || null,
        e.telefonoContacto || null,
        null,
        null,
        e.createdAt,
        e.updatedAt,
      ],
    );
  }

  console.log("Pasajeros...");
  const numDocUsados = {};
  for (const p of perfilPasajeros) {
    let ndoc = p.numeroDocumento || null;
    if (ndoc !== null && ndoc.trim() === "") ndoc = null;
    if (ndoc !== null) {
      if (numDocUsados[ndoc]) {
        ndoc = ndoc + "_" + p.id;
        console.log(
          "    numeroDocumento duplicado corregido:",
          p.id,
          "->",
          ndoc,
        );
      }
      numDocUsados[ndoc] = true;
    }
    await pg(
      'INSERT INTO "Pasajeros" (id, "usuarioId", telefono, direccion, "tipoDocumentoId", "barrioId", "numeroDocumento", "fechaNacimiento", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (id) DO NOTHING',
      [
        p.id,
        p.usuarioId,
        p.telefono || null,
        p.direccion || null,
        p.tipoDocumentoId || null,
        null,
        ndoc,
        p.fechaNacimiento || null,
        p.createdAt,
        p.updatedAt,
      ],
    );
  }

  // ── Vehiculos ──────────────────────────────────────────
  console.log("Vehiculos...");
  for (const v of vehiculos) {
    await pg(
      'INSERT INTO "Vehiculos" (id, placa, marca, modelo, color, "capacidadPasajeros", "tipoVehiculo", "numeroInterno", "entidadId", "estadoId", latitud, longitud, "ultimaActualizacion", "velocidadActual", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) ON CONFLICT (id) DO NOTHING',
      [
        v.id,
        v.placa || null,
        v.marca || null,
        v.modelo || null,
        v.color || null,
        v.capacidadPasajeros || null,
        null,
        null,
        v.entidadId || null,
        v.estadoId || null,
        v.latitud || null,
        v.longitud || null,
        v.ultimaActualizacion || null,
        null,
        v.createdAt,
        v.updatedAt,
      ],
    );
  }

  // ── Rutas ──────────────────────────────────────────────
  console.log("Rutas...");
  for (const r of rutas) {
    await pg(
      'INSERT INTO "Rutas" (id, nombre, "origenId", "destinoId", descripcion, "distanciaKm", "tiempoEstimadoMinutos", "rutaGeometria", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (id) DO NOTHING',
      [
        r.id,
        r.nombre || null,
        r.origenId ?? null,
        r.destinoId ?? null,
        r.descripcion || null,
        r.distanciaKm ?? null,
        r.tiempoEstimadoMinutos ?? null,
        r.rutaGeometria || null,
        r.createdAt,
        r.updatedAt,
      ],
    );
  }

  // ── Horarios ───────────────────────────────────────────
  console.log("Horarios...");
  for (const h of horarios) {
    await pg(
      'INSERT INTO "Horarios" (id, "rutaId", "horaSalida", "frecuenciaMinutos", "diasSemana", "fechaInicio", "fechaFin", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING',
      [
        h.id,
        h.rutaId || null,
        h.horaSalida || null,
        h.frecuenciaMinutos || null,
        h.diasSemana || null,
        h.fechaInicio || null,
        h.fechaFin || null,
        h.createdAt,
        h.updatedAt,
      ],
    );
  }

  // ── Viajes ─────────────────────────────────────────────
  console.log("Viajes...");
  for (const v of viajes) {
    const nuevoConductorId = v.conductorId
      ? usuarioAConductor[v.conductorId] || null
      : null;
    const nuevoVehiculoId = v.horarioId
      ? horarioAVehiculo[v.horarioId] || null
      : null;
    await pg(
      'INSERT INTO "Viajes" (id, "conductorId", "horarioId", "vehiculoId", "precioEstimado", "horaInicio", "horaFin", "kilometrosRecorridos", "estadoId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (id) DO NOTHING',
      [
        v.id,
        nuevoConductorId,
        v.horarioId || null,
        nuevoVehiculoId,
        v.precioEstimado || null,
        null,
        null,
        null,
        v.estadoId || null,
        v.createdAt,
        v.updatedAt,
      ],
    );
  }

  // ── ViajePasajeros ─────────────────────────────────────
  console.log("ViajePasajeros...");
  for (const vp of viajePasajeros) {
    const nuevoPasajeroId = usuarioAPasajero[vp.pasajeroId] || null;
    if (!nuevoPasajeroId) {
      console.log(
        "    Saltando ViajePasajero",
        vp.id,
        "- pasajeroId",
        vp.pasajeroId,
        "no tiene perfil pasajero",
      );
      continue;
    }
    await pg(
      'INSERT INTO "ViajePasajeros" (id, "viajeId", "pasajeroId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING',
      [vp.id, vp.viajeId, nuevoPasajeroId, vp.createdAt, vp.updatedAt],
    );
  }

  console.log("");
  console.log("Migración MySQL → PostgreSQL completada.");

  await mysqlConn.end();
  await pgPool.end();
}

migrar().catch((err) => {
  console.error("Error en migración:", err.message);
  process.exitCode = 1;
});
