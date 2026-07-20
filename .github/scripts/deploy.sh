#!/usr/bin/env bash
set -Eeuo pipefail

echo "========================================"
echo " Iniciando despliegue de RutaGo Backend"
echo "========================================"
cd "$HOME/backend"
echo "→ Actualizando repositorio..."
git pull --ff-only origin main
echo "→ Instalando dependencias..."
npm ci --include=dev
echo "→ Ejecutando migraciones de producción..."
export NODE_ENV=production
npx sequelize-cli db:migrate --env production
echo "→ Insertando/actualizando datos de catálogos..."
npx sequelize-cli db:seed:all --env production
echo "→ Migrando pasajeros existentes a PerfilPasajero..."
node scripts/migrarPasajeros.js
echo "→ Normalizando datos para validaciones..."
node scripts/migrar-validaciones.js
echo "→ Eliminando dependencias de desarrollo..."
npm prune --omit=dev
echo "→ Reiniciando únicamente RutaGo Backend..."
sudo -n /usr/bin/systemctl restart rutago.service
echo "→ Verificando estado de rutago.service..."
if ! /usr/bin/systemctl is-active --quiet rutago.service; then
    echo "❌ El servicio rutago.service no quedó activo."
    /usr/bin/systemctl status rutago.service \
        --no-pager \
        --full || true
    exit 1
fi
echo "✅ rutago.service se encuentra activo."
echo "✅ Despliegue finalizado correctamente."
