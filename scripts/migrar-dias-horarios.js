require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { Sequelize } = require("sequelize");

async function main() {
  const sequelize = new Sequelize(
    process.env.DB_NAME || "rutago_db",
    process.env.USER_DB || "root",
    process.env.DB_PASSWORD,
    {
      host: process.env.HOST || "localhost",
      port: parseInt(process.env.PORT_DB) || 3306,
      dialect: "mysql",
      logging: false,
    },
  );

  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos.");

    const [rows] = await sequelize.query(
      "SELECT id, diasSemana FROM Horarios WHERE diasSemana IS NOT NULL AND diasSemana != ''",
    );

    let copiados = 0;
    let saltados = 0;

    for (const row of rows) {
      const esFecha = /^\d{4}-\d{2}-\d{2}$/.test(row.diasSemana);
      if (esFecha) {
        await sequelize.query(
          "UPDATE Horarios SET fechaInicio = diasSemana WHERE id = ?",
          { replacements: [row.id] },
        );
        console.log(`  ✓ ID ${row.id}: "${row.diasSemana}" copiado a fechaInicio`);
        copiados++;
      } else {
        console.log(`  - ID ${row.id}: "${row.diasSemana}" no es una fecha válida, se omite`);
        saltados++;
      }
    }

    console.log(`\nListo. ${copiados} copiados, ${saltados} omitidos.`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

main();
