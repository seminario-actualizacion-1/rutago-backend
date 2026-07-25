const { Horario, Viaje, PerfilConductor } = require("../src/models");

async function migrar() {
  const horarios = await Horario.findAll();
  let creados = 0;

  for (const horario of horarios) {
    const existe = await Viaje.findOne({ where: { horarioId: horario.id } });
    if (existe) continue;

    const perfil = await PerfilConductor.findOne({ where: { vehiculoId: horario.vehiculoId } });

    await Viaje.create({
      rutaId: horario.rutaId,
      horarioId: horario.id,
      conductorId: perfil ? perfil.usuarioId : null,
      estadoId: 1,
    });
    creados++;
  }

  console.log(`Creados ${creados} viajes para horarios existentes.`);
  process.exit(0);
}

migrar().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
