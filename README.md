# [**RutaGo**](https://rutago.seminario1.eleueleo.com/) - Backend

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
- JWT (jsonwebtoken)
- bcrypt

---

## 📋 Requisitos previos

- Node.js >= 18
- MySQL >= 8.0
- npm o yarn

---

## 📁 Estructura del proyecto

```
rutago-backend/
├── .github/
│   ├── workflows/        # GitHub Actions (blank.yml)
│   └── scripts/          # Scripts de deploy
├── src/
│   ├── config/           # Configuración (DB, roles, estados)
│   ├── controllers/      # Controladores por módulo
│   ├── helpers/          # Utilidades (paginación)
│   ├── middlewares/      # Auth y role middleware
│   ├── migrations/       # Migraciones Sequelize
│   ├── models/           # Modelos Sequelize
│   ├── repositories/     # Capa de acceso a datos
│   ├── routes/           # Definición de rutas
│   ├── seeders/          # Seeders con datos iniciales
│   ├── services/         # Lógica de negocio
│   └── index.js          # Punto de entrada
├── scripts/              # Scripts auxiliares (migrarPasajeros.js)
├── .env                  # Variables de entorno
├── .sequelizerc          # Configuración Sequelize CLI
└── package.json
```

---

## 📦 Scripts disponibles

```bash
npm start          # Iniciar servidor (producción)
npm run dev        # Iniciar con nodemon (desarrollo)
```

---

## 🏗️ Arquitectura

```
Cliente (Navegador)
      │
      ▼
Frontend (React + Vite)
  ─── https://rutago.seminario1.eleueleo.com/
      │
      ▼  (proxy /api)
Backend (Express.js + Sequelize)
  ─── https://rutago.seminario1.eleueleo.com/api
      │
      ▼
MySQL 8.0
```

El frontend se sirve desde el mismo dominio VPS. Las peticiones a `/api` son redirigidas al backend mediante un proxy reverso (Nginx/systemd). El backend gestiona autenticación JWT, roles y operaciones CRUD con paginación, búsqueda y ordenamiento.

---

## 🔗 URLs activas

| Servicio   | URL                                        |
| ---------- | ------------------------------------------ |
| Frontend   | https://rutago.seminario1.eleueleo.com/    |
| Backend    | https://rutago.seminario1.eleueleo.com/api |
| Swagger    | http://localhost:8082/api/docs             |

---

## 👥 Usuarios de prueba

| Rol             | Correo               | Contraseña           |
| --------------- | -------------------- | -------------------- |
| Administrador   | admin@rutago.com     | admin123456          |
| Conductor       | conductor@rutago.com | conductor123456      |
| Pasajero        | pasajero@rutago.com  | pasajero123456       |
| Entidad Externa | entidad@rutago.com   | entidadExterna123456 |

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

| Método | Ruta                               | Descripción          |
| ------ | ---------------------------------- | -------------------- |
| POST   | /api/usuarios/login                | Iniciar sesión       |
| POST   | /api/usuarios/registro             | Registrar usuario    |
| POST   | /api/usuarios/recuperar-contrasena | Recuperar contraseña |

### Usuarios

| Método | Ruta                          | Roles | Descripción                 |
| ------ | ----------------------------- | ----- | --------------------------- |
| GET    | /api/usuarios                 | Admin | Listar usuarios             |
| GET    | /api/usuarios/:id             | Admin | Obtener usuario por ID      |
| POST   | /api/usuarios                 | Admin | Crear usuario               |
| PUT    | /api/usuarios/:id             | Admin | Actualizar usuario          |
| DELETE | /api/usuarios/:id             | Admin | Eliminar usuario            |
| GET    | /api/usuarios/verificar-token | Auth  | Verificar validez del token |
| GET    | /api/usuarios/me/perfil       | Auth  | Obtener perfil del usuario autenticado |
| PUT    | /api/usuarios/me/perfil       | Auth  | Actualizar perfil del usuario autenticado |

### Vehículos

| Método | Ruta                         | Roles         | Descripción                  |
| ------ | ---------------------------- | ------------- | ---------------------------- |
| GET    | /api/vehiculos               | Auth          | Listar (filtro por estadoId) |
| GET    | /api/vehiculos/:id           | Auth          | Obtener vehículo             |
| GET    | /api/vehiculos/:id/ubicacion | Auth          | Obtener ubicación            |
| POST   | /api/vehiculos               | Admin/Entidad | Crear vehículo               |
| PUT    | /api/vehiculos/:id           | Admin/Entidad | Actualizar vehículo          |
| DELETE | /api/vehiculos/:id           | Admin/Entidad | Eliminar vehículo            |

### Perfiles (Conductor, Pasajero, Entidad)

| Método | Ruta                                        | Roles  | Descripción                          |
| ------ | ------------------------------------------- | ------ | ------------------------------------ |
| GET    | /api/perfiles-conductor                     | Admin  | Listar perfiles de conductor         |
| GET    | /api/perfiles-conductor/me/perfil           | Cond.  | Obtener mi perfil de conductor       |
| PUT    | /api/perfiles-conductor/me/perfil           | Cond.  | Actualizar mi perfil de conductor    |
| GET    | /api/perfiles-pasajero                      | Admin  | Listar perfiles de pasajero          |
| GET    | /api/perfiles-pasajero/me/perfil            | Pasaj. | Obtener mi perfil de pasajero        |
| PUT    | /api/perfiles-pasajero/me/perfil            | Pasaj. | Actualizar mi perfil de pasajero     |
| GET    | /api/perfiles-entidad                       | Admin  | Listar perfiles de entidad           |
| GET    | /api/perfiles-entidad/me/perfil             | Entid. | Obtener mi perfil de entidad         |
| PUT    | /api/perfiles-entidad/me/perfil             | Entid. | Actualizar mi perfil de entidad      |

### Rutas, Horarios, Barrios, Comunas, Viajes

Siguen el mismo patrón CRUD con paginación, búsqueda (`q`) y ordenamiento (`sortBy`, `sortOrder`).

| Recurso       | Ruta base                  | Roles permitidos |
| ------------- | -------------------------- | ---------------- |
| Rutas         | /api/rutas                 | Admin            |
| Horarios      | /api/horarios              | Admin            |
| Barrios       | /api/barrios               | Admin            |
| Comunas       | /api/comunas               | Admin            |
| Viajes        | /api/viajes                | Admin/Auth       |

Endpoints destacados adicionales:

| Método | Ruta                                    | Roles  | Descripción                       |
| ------ | --------------------------------------- | ------ | --------------------------------- |
| GET    | /api/rutas/destino/:destino             | Auth   | Buscar rutas por destino          |
| GET    | /api/viajes/mis-viajes                  | Auth   | Obtener viajes del usuario actual |
| GET    | /api/horarios/ruta/:rutaId              | Auth   | Horarios de una ruta              |
| GET    | /api/horarios/vehiculo/:vehiculoId      | Auth   | Horarios de un vehículo           |

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

## 📊 Estado del Proyecto

### ✅ Completado

- Sistema de autenticación con JWT (login, registro, verificación de token).
- Roles: Administrador, Conductor, Pasajero, Entidad Externa.
- CRUD completo con paginación, búsqueda (`q`) y ordenamiento (`sortBy`/`sortOrder`) en 10 módulos: Usuarios, Vehículos, Rutas, Horarios, Conductores, Pasajeros, Entidades, Barrios, Comunas, Viajes.
- Catalogo de estados y tipos documento con migraciones y seeders idempotentes.
- Datos reales de Buenaventura (12 comunas, 104 barrios).
- Migraciones y seeders con Sequelize, ejecutados automáticamente en el pipeline de deploy.
- CI/CD con GitHub Actions: despliegue automático al hacer push a `main`.
- Actualización y reinicio automático del servicio (systemctl) en el VPS.
- Protección de rutas por rol (middleware `roleMiddleware`).
- Página 403 (Acceso Denegado) para usuarios sin rol permitido.
- Logout con reemplazo de historial (evita volver atrás con el navegador).
- Dashboard modular con componentes separados por rol.
- API REST documentada con todos los endpoints.

### 🚧 En desarrollo

- Endpoints de geolocalización en tiempo real (WebSockets).

### 📌 Pendiente

- Seguimiento GPS en tiempo real.
- Estado de buses en tiempo real.
- Notificaciones automáticas.

---
