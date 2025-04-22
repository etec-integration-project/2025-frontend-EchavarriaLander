# 🎬 ProjectoLander - Plataforma de Streaming

Una plataforma de streaming elegante y moderna con perfiles de usuario, planes de suscripción y una amplia biblioteca de películas y series. Construida con React, Node.js y MySQL.

## 🚀 Características

- **Autenticación y Perfiles de Usuario**
  - Soporte multi-perfil por cuenta
  - Personalización de perfiles con avatares
  - Perfil infantil con filtrado de contenido

- **Biblioteca de Contenido**
  - Películas y series organizadas por género
  - Streaming de video de alta calidad
  - Información detallada del contenido

- **Gestión de Suscripciones**
  - Múltiples niveles de suscripción
  - Procesamiento seguro de pagos
  - Comparación de planes

- **Experiencia de Usuario**
  - Diseño responsivo para todos los dispositivos
  - Funcionalidad de lista de reproducción
  - Recomendaciones de contenido

## 🛠️ Stack Tecnológico

### Frontend
- React con TypeScript
- React Router para navegación
- Tailwind CSS para estilos
- Vite para desarrollo rápido
- Axios para peticiones API

### Backend
- Node.js con Express
- Base de datos MySQL
- JWT para autenticación
- bcrypt para seguridad de contraseñas

### DevOps
- Docker y Docker Compose
- NGINX para servir el frontend

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- Docker y Docker Compose
- MySQL (si se ejecuta localmente)

## 🔧 Instalación y Configuración

### Usando Docker (Recomendado)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/etec-integration-project/2025-frontend-EchavarriaLander.git
   cd 2025-frontend-EchavarriaLander
   ```

2. Inicia la aplicación con Docker Compose:
   ```bash
   docker-compose up
   ```

3. Accede a la aplicación:
   - Frontend: http://localhost:5173
   - API Backend: http://localhost:5174/api

### Configuración Manual

#### Frontend

1. Navega al directorio frontend:
   ```bash
   cd Frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` (usa .env.example como referencia)

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

#### Backend

1. Navega al directorio backend:
   ```bash
   cd Backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos:
   ```bash
   mysql -u root -p < db/database.sql
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

## 🗄️ Estructura de la Base de Datos

La aplicación utiliza MySQL con las siguientes tablas principales:
- users - Autenticación de usuarios e información de cuenta
- profiles - Perfiles de usuario con preferencias
- subscription_plans - Niveles de suscripción disponibles
- movies - Catálogo de contenido
- genres - Categorización de contenido
- watchlist - Contenido guardado por el usuario

## 🤝 Contribuciones

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/caracteristica-asombrosa`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna característica asombrosa'`)
4. Empuja a la rama (`git push origin feature/caracteristica-asombrosa`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 📸 Capturas de Pantalla



## 📧 Contacto

Tu Nombre - tu.email@ejemplo.com

Enlace del Proyecto: [https://github.com/etec-integration-project/2025-frontend-EchavarriaLander](https://github.com/etec-integration-project/2025-frontend-EchavarriaLander)
