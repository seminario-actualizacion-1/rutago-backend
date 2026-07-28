# [**RutaGo**](https://rutago.seminario1.eleueleo.com/) - Backend

![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat&logo=express)
![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?style=flat&logo=sequelize)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=jsonwebtoken)
![Zod](https://img.shields.io/badge/Zod-3.23-3E67B1?style=flat&logo=zod)

Backend del proyecto RutaGo

## 📑 Tabla de Contenido

- [Integrantes](#integrantes)
- [Tecnologías](#tecnologias)
- [Requisitos previos](#requisitos-previos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts disponibles](#scripts-disponibles)
- [Arquitectura](#arquitectura)
- [URLs activas](#urls-activas)
- [Usuarios de prueba](#usuarios-de-prueba)
- [Roles del sistema](#roles-del-sistema)
- [Instalación](#instalación)
- [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
- [Base de datos con Sequelize](#base-de-datos-con-sequelize)
- [API Endpoints](#api-endpoints)
- [Ejecución](#ejecución)
- [Estado del Proyecto](#estado-del-proyecto)
- [Checklist de Evaluación](#checklist-de-evaluación--fase-2)
- [Enlaces](#enlaces)

---

## Integrantes:

Cristian David Garcia Valderrama.<br>
Jhon Edwar Suarez Quiñonez.<br>
Sebastian Guapi Andrade<br>
Stefany Potosi Reyes<br>
Angel Santiago Estupiñan Gomez<br>

---

<a id="tecnologias"></a>

## 🛠️ Tecnologías

- ⚙️ **Node.js 18** + **Express 4.21** — Framework backend
- 🗄️ **Sequelize 6** + **MySQL 8** — ORM y persistencia
- 🔐 **JWT** + **bcrypt** — Autenticación y hash
- ✅ **Zod** — Validación de schemas
- 🛡️ **express-rate-limit** — Seguridad y rate limiting

---

<a id="requisitos-previos"></a>

## 📋 Requisitos previos

- Node.js >= 18
- MySQL >= 8.0
- npm o yarn

---

<a id="estructura-del-proyecto"></a>

## 📁 Estructura del proyecto

```
rutago-backend/
├── .github/
│   ├── workflows/          # GitHub Actions (blank.yml)
│   └── scripts/            # Scripts de deploy
├── scripts/                # Scripts auxiliares
├── src/
│   ├── config/             # Configuración (DB, Zod, estados)
│   ├── controllers/        # Controladores por módulo
│   ├── dtos/               # DTOs de respuesta
│   ├── helpers/            # Utilidades (paginación)
│   ├── middlewares/        # Auth, role y validación Zod
│   ├── migrations/         # Migraciones Sequelize
│   ├── models/             # Modelos Sequelize
│   ├── repositories/       # Capa de acceso a datos
│   ├── routes/             # Definición de rutas
│   ├── schemas/            # Schemas de validación Zod
│   ├── seeders/            # Seeders con datos iniciales
│   ├── services/           # Lógica de negocio
│   └── index.js            # Punto de entrada
├── .env                    # Variables de entorno
├── .env.example            # Plantilla de variables de entorno
├── .gitignore
├── .sequelizerc            # Configuración Sequelize CLI
├── package.json
└── README.md
```

---

<a id="scripts-disponibles"></a>

## 📦 Scripts disponibles

```bash
npm start          # Iniciar servidor (producción)
npm run dev        # Iniciar con nodemon (desarrollo)
```

---

<a id="arquitectura"></a>

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

<a id="urls-activas"></a>

## 🔗 URLs activas

| Servicio | URL                                         |
| -------- | ------------------------------------------- |
| Frontend | https://rutago.seminario1.eleueleo.com/     |
| Backend  | https://rutago.seminario1.eleueleo.com/api  |
| Swagger  | http://localhost:8082/api/docs (solo local) |

---

<a id="usuarios-de-prueba"></a>

## 👥 Usuarios de prueba

| Rol             | Correo               | Contraseña           |
| --------------- | -------------------- | -------------------- |
| Administrador   | admin@rutago.com     | admin123456          |
| Conductor       | conductor@rutago.com | conductor123456      |
| Pasajero        | pasajero@rutago.com  | pasajero123456       |
| Entidad Externa | entidad@rutago.com   | entidadExterna123456 |

---

<a id="roles-del-sistema"></a>

## 👥 Roles del sistema

| ID  | Nombre          | Descripción                         |
| --- | --------------- | ----------------------------------- |
| 1   | Administrador   | Acceso completo a todos los módulos |
| 2   | Conductor       | Gestiona viajes, ve perfil          |
| 3   | Pasajero        | Consulta rutas y horarios           |
| 4   | Entidad Externa | Gestiona vehículos de su entidad    |

<a id="instalacion"></a>

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install
```

<a id="configuracion-de-variables-de-entorno"></a>

## 🔧 Configuración de variables de entorno

El archivo `.env` debe estar en la raíz del backend. Ejemplo mínimo:

```env
PORT=8082
HOST=localhost
PORT_DB=3306
USER_DB=root
DB_PASSWORD=tu_password
DB_NAME=rutago_db
JWT_SECRET=tu_clave_super_secreta
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
API_URL=https://rutago.seminario1.eleueleo.com/api
CORS_ORIGIN=https://rutago.seminario1.eleueleo.com
```

<a id="base-de-datos-con-sequelize"></a>

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

<a id="api-endpoints"></a>

## 🌐 API Endpoints

### Autenticación

| Método | Ruta                               | Descripción          |
| ------ | ---------------------------------- | -------------------- |
| POST   | /api/usuarios/login                | Iniciar sesión       |
| POST   | /api/usuarios/registro             | Registrar usuario    |
| POST   | /api/usuarios/recuperar-contrasena | Recuperar contraseña |

### Usuarios

| Método | Ruta                          | Roles | Descripción                               |
| ------ | ----------------------------- | ----- | ----------------------------------------- |
| GET    | /api/usuarios                 | Admin | Listar usuarios                           |
| GET    | /api/usuarios/:id             | Admin | Obtener usuario por ID                    |
| POST   | /api/usuarios                 | Admin | Crear usuario                             |
| PUT    | /api/usuarios/:id             | Admin | Actualizar usuario                        |
| DELETE | /api/usuarios/:id             | Admin | Eliminar usuario                          |
| GET    | /api/usuarios/verificar-token | Auth  | Verificar validez del token               |
| GET    | /api/usuarios/me/perfil       | Auth  | Obtener perfil del usuario autenticado    |
| PUT    | /api/usuarios/me/perfil       | Auth  | Actualizar perfil del usuario autenticado |
| PUT    | /api/usuarios/:id/rol         | Admin | Cambiar rol de un usuario                 |

### Vehículos

| Método | Ruta                         | Roles         | Descripción                  |
| ------ | ---------------------------- | ------------- | ---------------------------- |
| GET    | /api/vehiculos               | Auth          | Listar (filtro por estadoId) |
| GET    | /api/vehiculos/:id           | Auth          | Obtener vehículo             |
| GET    | /api/vehiculos/:id/ubicacion | Auth          | Obtener ubicación            |
| POST   | /api/vehiculos               | Admin/Entidad | Crear vehículo               |
| PUT    | /api/vehiculos/:id           | Admin/Entidad | Actualizar vehículo          |
| PUT    | /api/vehiculos/:id/ubicacion | Conductor     | Actualizar ubicación         |
| DELETE | /api/vehiculos/:id           | Admin/Entidad | Eliminar vehículo            |

### Perfiles (Conductor, Pasajero, Entidad)

| Método | Ruta                                      | Roles  | Descripción                       |
| ------ | ----------------------------------------- | ------ | --------------------------------- |
| GET    | /api/perfiles-conductor                   | Admin  | Listar perfiles de conductor      |
| GET    | /api/perfiles-conductor/me/perfil         | Cond.  | Obtener mi perfil de conductor    |
| PUT    | /api/perfiles-conductor/me/perfil         | Cond.  | Actualizar mi perfil de conductor |
| PATCH  | /api/perfiles-conductor/:id/estado        | Admin  | Cambiar estado del conductor      |
| POST   | /api/perfiles-conductor/crear-con-usuario | Admin  | Crear conductor con usuario nuevo |
| GET    | /api/perfiles-pasajero                    | Admin  | Listar perfiles de pasajero       |
| GET    | /api/perfiles-pasajero/me/perfil          | Pasaj. | Obtener mi perfil de pasajero     |
| PUT    | /api/perfiles-pasajero/me/perfil          | Pasaj. | Actualizar mi perfil de pasajero  |
| POST   | /api/perfiles-pasajero/crear-con-usuario  | Admin  | Crear pasajero con usuario nuevo  |
| GET    | /api/perfiles-entidad                     | Admin  | Listar perfiles de entidad        |
| GET    | /api/perfiles-entidad/me/perfil           | Entid. | Obtener mi perfil de entidad      |
| PUT    | /api/perfiles-entidad/me/perfil           | Entid. | Actualizar mi perfil de entidad   |
| POST   | /api/perfiles-entidad/crear-con-usuario   | Admin  | Crear entidad con usuario nuevo   |

### Catálogos

| Método | Ruta                   | Roles | Descripción                 |
| ------ | ---------------------- | ----- | --------------------------- |
| GET    | /api/estados-vehiculo  | Auth  | Listar estados de vehículo  |
| GET    | /api/estados-conductor | Auth  | Listar estados de conductor |
| GET    | /api/estados-viaje     | Auth  | Listar estados de viaje     |
| GET    | /api/tipos-documento   | Auth  | Listar tipos de documento   |

### Rutas, Horarios, Barrios, Comunas

Siguen el mismo patrón CRUD con paginación, búsqueda (`q`) y ordenamiento (`sortBy`, `sortOrder`).

| Recurso  | Ruta base     | Roles permitidos |
| -------- | ------------- | ---------------- |
| Rutas    | /api/rutas    | Admin            |
| Horarios | /api/horarios | Admin            |
| Barrios  | /api/barrios  | Admin            |
| Comunas  | /api/comunas  | Admin            |

Endpoints destacados adicionales:

| Método | Ruta                               | Roles | Descripción              |
| ------ | ---------------------------------- | ----- | ------------------------ |
| GET    | /api/rutas/destino/:destino        | Auth  | Buscar rutas por destino |
| GET    | /api/horarios/ruta/:rutaId         | Auth  | Horarios de una ruta     |
| GET    | /api/horarios/vehiculo/:vehiculoId | Auth  | Horarios de un vehículo  |

### Viajes

| Método | Ruta                   | Roles      | Descripción                       |
| ------ | ---------------------- | ---------- | --------------------------------- |
| GET    | /api/viajes            | Admin      | Listar viajes                     |
| GET    | /api/viajes/:id        | Auth       | Obtener viaje por ID              |
| POST   | /api/viajes            | Auth       | Crear viaje                       |
| PUT    | /api/viajes/:id        | Admin      | Actualizar viaje                  |
| DELETE | /api/viajes/:id        | Admin      | Eliminar viaje                    |
| PATCH  | /api/viajes/:id/estado | Admin/Cond | Cambiar estado del viaje          |
| POST   | /api/viajes/:id/unirse | Pasajero   | Unirse a un viaje como pasajero   |
| GET    | /api/viajes/mis-viajes | Auth       | Obtener viajes del usuario actual |

---

<a id="ejecucion"></a>

## 🚀 Ejecución

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

---

<a id="cicd-y-deploy"></a>

## 🚀 CI/CD y Deploy

### Workflow

`.github/workflows/blank.yml`

### Flujo de despliegue automático

```
Push a main
     ↓
Checkout código
     ↓
npm install
     ↓
Ejecutar migraciones (npx sequelize-cli db:migrate)
     ↓
Ejecutar seeders (npx sequelize-cli db:seed:all)
     ↓
rsync archivos → VPS
     ↓
sudo systemctl restart rutago-backend
```

El pipeline ejecuta migraciones y seeders automáticamente antes de reiniciar el servicio, garantizando que la estructura de la BD esté siempre actualizada en producción.

---

<a id="estado-del-proyecto"></a>

## 📊 Estado del Proyecto

### ✅ Completado

- Sistema de autenticación con JWT (login, registro, verificación de token, refresh).
- Roles: Administrador, Conductor, Pasajero, Entidad Externa.
- Validación de entrada con Zod (schemas + middleware).
- Catálogos dinámicos desde BD: estados de vehículo, conductor, viaje y tipos de documento.
- CRUD completo con paginación, búsqueda (`q`) y ordenamiento (`sortBy`/`sortOrder`) en 10 módulos: Usuarios, Vehículos, Rutas, Horarios, Conductores, Pasajeros, Entidades, Barrios, Comunas, Viajes.
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

- Migración de MySQL a PostgreSQL + PostGIS (datos espaciales).
- Seguimiento GPS en tiempo real.
- Estado de buses en tiempo real.
- Notificaciones automáticas.

---

<a id="checklist-de-evaluacion--fase-2"></a>

## ✅ Checklist de Evaluación — Fase 2

### Pruebas Funcionales en Vivo

- [ ] **Verificación de Rutas**: Al ingresar directamente a `/admin` sin autenticar, el sistema redirige al Login.
- [ ] **Prueba de Roles**: Al loguearse con un usuario no-admin, el sistema bloquea el acceso a `/admin` mostrando error 403.
- [ ] **Lectura Transaccional**: El panel administrativo carga datos dinámicos de al menos dos tablas transaccionales.
- [ ] **Cierre de Sesión Efectivo**: Al cerrar sesión, el token se destruye en cliente y no se puede volver atrás con el navegador.

### Pruebas de Despliegue y Automatización

- [ ] **Despliegue por Git**: Último cambio en producción realizado mediante GitHub Actions.
- [ ] **Consistencia de Base de Datos**: Migraciones ejecutadas exitosamente en el pipeline de deploy.
- [ ] **Validación de Documentación**: README con arquitectura, URLs activas y usuarios de prueba.

---

<a id="enlaces"></a>

## 🔗 Enlaces

[Frontend](https://github.com/seminario-actualizacion-1/rutago-frontend)
