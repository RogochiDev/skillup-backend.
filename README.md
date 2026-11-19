# SkillUp Campus - Backend API (Semanas 1 - 4)

Plataforma EdTech desarrollada con **Node.js, Express, PostgreSQL, JWT y Bcrypt**.

## Requisitos Previos
- Node.js (v18 o superior)
- PostgreSQL instalado y corriendo localmente (base de datos `skillup_db`)

## Instalación y Ejecución Local
1. Clonar el repositorio e instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.example` a `.env` y completar las credenciales de PostgreSQL:
   ```env
   PORT=3001
   DATABASE_URL="postgresql://postgres:TU_CLAVE@localhost:5432/skillup_db"
   JWT_SECRET="skillup_clave_secreta_2026"
   ```
3. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Documentación de Endpoints (Colección Postman en `docs/api/`)

### 1. Estado del Servidor
- **GET** `/` -> Verifica que el servidor Express esté activo.

### 2. Autenticación (`/api/auth`)
- **POST** `/api/auth/register` -> Registro de nuevos usuarios con contraseña encriptada (`bcryptjs`).
- **POST** `/api/auth/login` -> Inicio de sesión real; valida credenciales y devuelve un **Token JWT** (expiración `24h`, payload `{ id, role }`).

### 3. Gestión de Cursos (`/api/courses`)
- **GET** `/api/courses` -> Lista todos los cursos disponibles (Público).
- **GET** `/api/courses/:id` -> Obtiene el detalle de un curso específico (Público).
- **POST** `/api/courses` -> Crea un curso nuevo (Protegido: requiere Token + Rol `ADMIN`).
- **PUT** `/api/courses/:id` -> Edita un curso existente (Protegido: requiere Token + Rol `ADMIN`).
- **DELETE** `/api/courses/:id` -> Elimina un curso (Protegido: requiere Token + Rol `ADMIN`).


## Esquema de Base de Datos (PostgreSQL - `skillup_db`)

### 1. Tabla `User` (Estudiantes y Administradores)

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `Integer` (PK) | Identificador único autoincremental |
| `email` | `String` (Único) | Correo electrónico del usuario |
| `password` | `String` | Contraseña encriptada con `bcryptjs` |
| `name` | `String` | Nombre completo del usuario |
| `role` | `String` | Rol de acceso (`STUDENT` o `ADMIN`) |
| `createdAt` | `DateTime` | Fecha de registro |
| `updatedAt` | `DateTime` | Fecha de última actualización |

### 2. Tabla `Course` (Catálogo de Cursos)

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `Integer` (PK) | Identificador único autoincremental |
| `title` | `String` | Título del curso |
| `description` | `String` | Descripción detallada |
| `instructor` | `String` | Nombre del profesor/instructor |
| `duration` | `String` | Duración estimada (ej. `"8 semanas"`) |
| `level` | `String` | Nivel del curso (`Inicial`, `Intermedio`, `Avanzado`) |
| `createdAt` | `DateTime` | Fecha de creación |
| `updatedAt` | `DateTime` | Fecha de última actualización |

### 3. Tabla `Enrollment` (Inscripciones — Relación `N:M`)
*Tabla intermedia que conecta a los estudiantes (`User`) con los cursos (`Course`). Restricción única compuesta `[userId, courseId]` para evitar inscripciones duplicadas.*

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `Integer` (PK) | Identificador único autoincremental |
| `userId` | `Integer` (FK) | Referencia a `User.id` |
| `courseId` | `Integer` (FK) | Referencia a `Course.id` |
| `enrolledAt` | `DateTime` | Fecha y hora de inscripción |
