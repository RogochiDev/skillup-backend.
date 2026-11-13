# SkillUp Campus - Backend API (Semanas 1 - 3)

Plataforma EdTech desarrollada con **Node.js, Express y PostgreSQL**.

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

## Contratos de API y Endpoints Disponibles

### 1. Estado del Servidor
- **GET** `/` -> Verifica que el servidor Express esté activo.

### 2. Registro de Usuarios (Implementación Real - Semana 3)
- **POST** `/api/auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "Rodolfo Estudiante",
    "email": "rodolfo@skillup.com",
    "password": "Password123!"
  }
  ```
- **Respuesta (`201 Created`):**
  ```json
  {
    "message": "Usuario creado exitosamente",
    "user": {
      "id": 1,
      "name": "Rodolfo Estudiante",
      "email": "rodolfo@skillup.com",
      "role": "STUDENT"
    }
  }
  ```

### 3. Login de Usuarios (Contrato Mock para Frontend - Semana 2)
- **POST** `/api/auth/login`
- **Respuesta (`200 OK`):** Devuelve estructura estándar con `token` JWT y datos de usuario.

### 4. Catálogo de Cursos (Contrato Mock para Frontend - Semana 2)
- **GET** `/api/courses`
- **Respuesta (`200 OK`):** Devuelve listado JSON de cursos disponibles para maquetación de Frontend.
