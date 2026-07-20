require("dotenv").config();
const db = require("../src/models");
const { Vehiculo, Barrio, Comuna, Ruta, PerfilEntidad, Usuario } = db;

const run = async () => {
  try {
    // Vehículos: placa < 5 chars → prefijo "RGO-"
    const vehiculos = await Vehiculo.findAll({ where: db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("placa")), "<", 5) });
    for (const v of vehiculos) {
      const nueva = `RGO-${v.placa}`.toUpperCase();
      await v.update({ placa: nueva });
      console.log(`Vehículo ${v.id}: placa "${v.placa}" → "${nueva}"`);
    }

    // Vehículos: color < 3 chars → completar
    const vehiculosColor = await Vehiculo.findAll({ where: db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("color")), "<", 3) });
    for (const v of vehiculosColor) {
      const nuevo = v.color.toUpperCase().padEnd(3, "X");
      await v.update({ color: nuevo });
      console.log(`Vehículo ${v.id}: color "${v.color}" → "${nuevo}"`);
    }

    // Barrios: nombre < 2 chars
    const barrios = await Barrio.findAll({ where: db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("nombre")), "<", 2) });
    for (const b of barrios) {
      const nuevo = b.nombre.trim().padEnd(2, "X");
      await b.update({ nombre: nuevo });
      console.log(`Barrio ${b.id}: nombre "${b.nombre}" → "${nuevo}"`);
    }

    // Comunas: nombre < 2 chars
    const comunas = await Comuna.findAll({ where: db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("nombre")), "<", 2) });
    for (const c of comunas) {
      const nuevo = c.nombre.trim().padEnd(2, "X");
      await c.update({ nombre: nuevo });
      console.log(`Comuna ${c.id}: nombre "${c.nombre}" → "${nuevo}"`);
    }

    // Rutas: nombre < 2 chars
    const rutas = await Ruta.findAll({ where: db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("nombre")), "<", 2) });
    for (const r of rutas) {
      const nuevo = r.nombre.trim().padEnd(2, "X");
      await r.update({ nombre: nuevo });
      console.log(`Ruta ${r.id}: nombre "${r.nombre}" → "${nuevo}"`);
    }

    // PerfilEntidad: razonSocial < 3 chars
    const entidades = await PerfilEntidad.findAll({ where: db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("razonSocial")), "<", 3) });
    for (const e of entidades) {
      const nuevo = e.razonSocial.trim().padEnd(3, "X");
      await e.update({ razonSocial: nuevo });
      console.log(`Entidad ${e.id}: razonSocial "${e.razonSocial}" → "${nuevo}"`);
    }

    // Usuarios: nombres/apellidos < 2 chars
    const usuarios = await Usuario.findAll({
      where: db.sequelize.or(
        db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("nombres")), "<", 2),
        db.sequelize.where(db.sequelize.fn("LENGTH", db.sequelize.col("apellidos")), "<", 2)
      )
    });
    for (const u of usuarios) {
      const nom = u.nombres.trim().padEnd(2, "X");
      const ape = u.apellidos.trim().padEnd(2, "X");
      await u.update({ nombres: nom, apellidos: ape });
      console.log(`Usuario ${u.id}: "${u.nombres} ${u.apellidos}" → "${nom} ${ape}"`);
    }

    console.log("Migración completada");
  } catch (err) {
    console.error("Error:", err);
  }
};

run();
