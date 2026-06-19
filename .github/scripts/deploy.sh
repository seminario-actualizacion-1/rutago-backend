#!/usr/bin/env bash
set -Eeuo pipefail

echo "Desplegando RutaGo Backend..."

cd "$HOME/backend"

export NODE_ENV=production

echo "→ Actualizando repositorio..."
git pull origin main

echo "→ Instalando dependencias..."
npm install

echo "→ Ejecutando migraciones..."
npx sequelize-cli db:migrate --env production

echo "→ Reiniciando servicio..."
sudo systemctl restart rutago.service

echo "→ Verificando servicio..."
sudo systemctl is-active --quiet rutago.service

echo "✅ Deploy finalizado correctamente."
