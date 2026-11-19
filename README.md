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
