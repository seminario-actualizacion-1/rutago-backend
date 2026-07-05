# rutago-backend

Backend del proyecto RutaGo

## Integrantes:

Cristian David Garcia Valderrama.<br>
Jhon Edwar Suarez Quiñonez.<br>
Sebastian Guapi Andrade<br>
Stefany Potosi Reyes<br>
Angel Santiago Estupiñan Gomez<br>

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

## 📁 Estructura del proyecto

```
rutago-backend/
├── src/
│   ├── config/           # Configuración (DB, roles, estados)
│   ├── controllers/      # Controladores por módulo
│   ├── helpers/          # Utilidades (paginación)
│   ├── middlewares/       # Auth y role middleware
│   ├── migrations/       # Migraciones Sequelize
│   ├── models/           # Modelos Sequelize
│   ├── repositories/     # Capa de acceso a datos
│   ├── routes/           # Definición de rutas
│   ├── seeders/          # Seeders con datos iniciales
│   ├── services/         # Lógica de negocio
│   └── index.js          # Punto de entrada
├── .env                  # Variables de entorno
├── package.json
└── README.md
```

---

## 📦 Scripts disponibles

```bash
npm start          # Iniciar servidor (producción)
npm run dev        # Iniciar con nodemon (desarrollo)
```

---

## 👥 Roles del sistema

| ID  | Nombre          | Descripción                         |
| --- | --------------- | ----------------------------------- |
| 1   | Administrador   | Acceso completo a todos los módulos |
| 2   | Conductor       | Gestiona viajes, ve perfil          |
| 3   | Pasajero        | Consulta rutas y horarios           |
| 4   | Entidad Externa | Gestiona vehículos de su entidad    |

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
JWT_SECRET=tu_clave_super_secreta
```

## 🗄️ Base de datos con Sequelize

Las migraciones y seeders se ejecutan con Sequelize CLI.

### Migraciones

Crean y modifican las tablas en la base de datos.

```bash
# Ejecutar todas las migraciones pendientes
npx sequelize-cli db:migrate

# Deshacer la ultima migracion
npx sequelize-cli db:migrate:undo

# Deshacer una migracion especifica
npx sequelize-cli db:migrate:undo --name 20260704000001-create-estados-vehiculo.js
```

### Seeders

Llnan las tablas con datos iniciales (roles, comunas, barrios, estados).

```bash
# Ejecutar todos los seeders
npx sequelize-cli db:seed:all

# Deshacer todos los seeders
npx sequelize-cli db:seed:undo:all
```

### Orden recomendado al clonar el proyecto por primera vez

```bash
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

## 🌐 API Endpoints

### Autenticación

| Método | Ruta               | Descripción       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/login    | Iniciar sesión    |
| POST   | /api/auth/register | Registrar usuario |

### Usuarios

| Método | Ruta                          | Roles | Descripción                 |
| ------ | ----------------------------- | ----- | --------------------------- |
| GET    | /api/usuarios                 | Admin | Listar usuarios             |
| GET    | /api/usuarios/:id             | Admin | Obtener usuario por ID      |
| POST   | /api/usuarios                 | Admin | Crear usuario               |
| PUT    | /api/usuarios/:id             | Admin | Actualizar usuario          |
| DELETE | /api/usuarios/:id             | Admin | Eliminar usuario            |
| GET    | /api/usuarios/verificar-token | Auth  | Verificar validez del token |

### Vehículos

| Método | Ruta                         | Roles | Descripción                  |
| ------ | ---------------------------- | ----- | ---------------------------- |
| GET    | /api/vehiculos               | Auth  | Listar (filtro por estadoId) |
| GET    | /api/vehiculos/:id           | Auth  | Obtener vehículo             |
| GET    | /api/vehiculos/:id/ubicacion | Auth  | Obtener ubicación            |
| POST   | /api/vehiculos               | Admin | Crear vehículo               |
| PUT    | /api/vehiculos/:id           | Admin | Actualizar vehículo          |
| DELETE | /api/vehiculos/:id           | Admin | Eliminar vehículo            |

### Rutas, Horarios, Barrios, Comunas, Entidades, Conductores, Pasajeros

Siguen el mismo patrón CRUD con paginación, búsqueda (`q`) y ordenamiento (`sortBy`, `sortOrder`).

---

## 🚀 Ejecución

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 🔗 Enlaces

[Frontend](https://github.com/seminario-actualizacion-1/rutago-frontend)

---
