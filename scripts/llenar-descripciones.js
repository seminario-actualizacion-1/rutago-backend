require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../src/config/config");
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

const descripciones = {
  TiposDocumento: {
    1: "Cédula de Ciudadanía",
    2: "Tarjeta de Identidad",
    3: "Cédula de Extranjería",
    4: "Número de Identificación Tributaria",
    5: "Pasaporte",
  },
  EstadosVehiculo: {
    1: "Vehículo en terminal disponible",
    2: "Vehículo en ruta",
    3: "Vehículo próximo a salir",
  },
  EstadosConductor: {
    1: "Conductor disponible para asignar viajes",
    2: "Conductor realizando un viaje",
    3: "Conductor inactivo",
  },
  EstadosViaje: {
    1: "Buscando conductor disponible",
    2: "Viaje aceptado por el conductor",
    3: "Viaje en curso",
    4: "Viaje finalizado exitosamente",
    5: "Viaje cancelado",
  },
  Roles: {
    1: "Acceso total al sistema",
    2: "Conductor de vehículos de transporte",
    3: "Usuario que solicita viajes",
    4: "Empresa de transporte externa",
  },
};

async function main() {
  await sequelize.authenticate();
  console.log("Conectado a la base de datos");

  for (const [tabla, registros] of Object.entries(descripciones)) {
    let count = 0;
    for (const [id, desc] of Object.entries(registros)) {
      const [result] = await sequelize.query(
        `UPDATE \`${tabla}\` SET descripcion = ? WHERE id = ? AND (descripcion IS NULL OR descripcion = '')`,
        { replacements: [desc, parseInt(id)] },
      );
      if (result.affectedRows > 0) {
        console.log(`  ${tabla} id=${id} → "${desc}"`);
        count++;
      }
    }
    if (count === 0) {
      console.log(`  ${tabla}: ninguna fila pendiente`);
    }
  }

  console.log("Listo.");
  await sequelize.close();
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
