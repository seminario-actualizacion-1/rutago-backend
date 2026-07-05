require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../src/config/config");
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

async function migrar() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    const [usuarios] = await sequelize.query(
      "SELECT id, nombres, apellidos FROM Usuarios WHERE rolId = 3 ORDER BY id",
    );
    const [perfiles] = await sequelize.query("SELECT usuarioId FROM PerfilPasajeros");
    const existentes = new Set(perfiles.map((p) => p.usuarioId));
    const pendientes = usuarios.filter((u) => !existentes.has(u.id));

    if (pendientes.length === 0) {
      console.log("Todos los pasajeros ya tienen perfil. Nada que migrar.");
      await sequelize.close();
      return;
    }

    console.log(`Migrando ${pendientes.length} pasajero(s) sin perfil...`);

    for (const u of pendientes) {
      await sequelize.query(
        "INSERT INTO PerfilPasajeros (usuarioId, telefono, direccion, tipoDocumentoId, numeroDocumento, fechaNacimiento, createdAt, updatedAt) VALUES (?, '', '', 1, '', NULL, NOW(), NOW())",
        { replacements: [u.id] },
      );
      console.log(`  Creado perfil para usuario ID ${u.id} - ${u.nombres} ${u.apellidos}`);
    }

    console.log("Migración completada");
    await sequelize.close();
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

migrar();
