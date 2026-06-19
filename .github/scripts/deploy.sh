#!/usr/bin/env bash
set -Eeuo pipefail

SSH_HOST="$1"
SSH_USER="$2"

echo "Desplegando RutaGo Backend..."
cd "/home/$SSH_USER/backend"
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
echo "✅ Deploy finalizado."
