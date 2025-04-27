# Blog de Juguetes - Proyecto Completo

Este repositorio contiene una aplicación completa para un blog de juguetes, desarrollada con Angular en el frontend y Node.js/Express/MongoDB en el backend.

## Descripción del Proyecto

El Blog de Juguetes es una aplicación web que permite a los usuarios:
- Ver publicaciones sobre juguetes
- Leer y escribir comentarios
- Administrar el contenido (para usuarios con rol de administrador)

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

```
final-project-diplomado/
├── frontend/     # Aplicación Angular
└── backend/      # API REST con Node.js y Express
```

## Requisitos de Sistema

- Node.js (versión 16 o superior)
- MongoDB (instalado localmente o una cuenta en MongoDB Atlas)
- Angular CLI (para desarrollo frontend)

## Instalación y Configuración

### 1. Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crea un archivo .env basado en el ejemplo proporcionado
```

### 2. Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install
```

## Ejecución del Proyecto

### Iniciar el Backend

```bash
# Desde el directorio backend
npm run dev  # Para entorno de desarrollo con recarga automática
# o
npm start    # Para entorno de producción
```

El servidor backend estará disponible en `http://localhost:<PORT>`, donde <PORT> es el puerto configurado en el archivo `.env` en el backend.

### Iniciar el Frontend

```bash
# Desde el directorio frontend
ng serve
```

La aplicación frontend estará disponible en `http://localhost:4200`.

## Características Principales

### Backend
- API RESTful
- Autenticación con JWT
- CRUD completo para juguetes
- Sistema de comentarios
- Manejo de subida de imágenes
- Validación de datos

### Frontend
- Interfaz de usuario atractiva con Angular Material
- Visualización de juguetes con imágenes
- Panel de administración
- Sistema de comentarios
- Responsive design para dispositivos móviles y de escritorio

## Documentación

Para obtener información más detallada sobre cada parte del proyecto:

- [Documentación del Frontend](./frontend/README.md)
- [Documentación del Backend](./backend/README.md)

## Licencia

Este proyecto está licenciado bajo la Licencia que se especifica en el archivo LICENSE.
