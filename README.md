# rutago-backend
Backend del proyecto RutaGo

## Integrantes:

- Cristian David Garcia Valderrama.
- Jhon Edwar Suarez Quiñonez.
- Sebastian Guapi Andrade
- Stefany Potosi Reyes
- Angel Santiago Estupiñan Gomez 

---

## 🛠️ Tecnologías

- Node.js + Express.js
- Sequelize ORM
- MySQL

---

## 📋 Requisitos previos

- Node.js >= 18
- MySQL >= 8.0
- npm o yarn

---

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install
```

## 🔧 Configuración de variables de entorno

El archivo `.env` debe estar en la raíz del backend. Ejemplo mínimo:

```env
PORT=8082
HOST=localhost
PORT_DB=3307
USER_DB=root
DB_PASSWORD=""
DB_NAME=rutago_db
JWT_SECRET=clave_super_secreta_rutago
```

## 🗄️ Base de datos (Sequelize)

```bash
# Ejecutar migraciones
npx sequelize-cli db:migrate
```

## 🚀 Ejecución

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

---

prueba.
