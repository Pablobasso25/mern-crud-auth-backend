# MERN Tasks Management System

Una aplicación Full-Stack robusta para la gestión de tareas personales, construida con el stack **MERN**. El sistema permite a los usuarios registrarse, iniciar sesión de forma segura y gestionar su propio listado de tareas con persistencia de datos.

## Características Principales

- **Autenticación Segura**: Implementación de **JWT** (JSON Web Tokens) almacenados en **Cookies** para una sesión persistente y protegida.
- **Gestión de Tareas (CRUD)**: Los usuarios pueden crear, visualizar, editar y eliminar sus tareas de forma privada.
- **Rutas Protegidas**: Middleware en el frontend que impide el acceso a `/tasks` a usuarios no autenticados.
- **Validación de Esquemas**: Uso de **Zod** en el backend para validar la integridad de los datos recibidos.
- **Manejo de Formularios**: Integración de **React Hook Form** para una captura de datos eficiente y validaciones en tiempo real en el cliente.
- **Diseño Moderno**: Interfaz construida con **Tailwind CSS v4** con modo oscuro integrado.

## Tecnologías

| Frontend             | Backend                |
| :------------------- | :--------------------- |
| **React** (Vite)     | **Node.js**            |
| **Context API**      | **Express**            |
| **React Router Dom** | **MongoDB & Mongoose** |
| **Axios**            | **JSON Web Token**     |
| **Tailwind CSS**     | **Zod**                |

---

## Instalación

### 1. Requisitos previos

- Node.js instalado.
- Base de datos MongoDB (Local o Atlas).

### 2. Configuración del Proyecto

Clona el repositorio y entra en la carpeta:

git clone https://github.com/Pablobasso25/mern-crud-auth-backend.git
cd mern-crud-auth-backend

### 3. Configuración del Backend
Instala las dependencias y configura las variables de entorno:
```bash
npm install
```
Crea un archivo .env en la raíz con:
PORT=4000
MONGODB_URI=tu_conexion_mongodb
TOKEN_SECRET=tu_secreto_para_jwt

### 4. Configuración del Frontend
Instala las dependencias del cliente:
```bash
cd client
npm install
```
## Ejecución

Para iniciar el proyecto en modo desarrollo, abre dos terminales:
```bash
npm run dev
```
```bash
cd client
npm run dev
````
## Futuras Mejoras
Actualmente el proyecto está en una fase funcional, pero planeo implementar:

- [ ] **Subida de Archivos**: Permitir adjuntar imágenes o documentos a las tareas.
- [ ] **Buscador y Filtros**: Filtrar tareas por título, fecha de creación o estado (completada/pendiente).
- [ ] **Notificaciones**: Avisos mediante Toasts cuando una tarea se crea o elimina con éxito.
- [ ] **Perfil de Usuario**: Opción para que el usuario cambie su avatar y contraseña.
- [ ] **Modo Offline**: Sincronización básica para trabajar sin conexión.

## Cómo Colaborar
¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto, sigue estos pasos:

Haz un Fork del proyecto.

Crea una nueva rama para tu funcionalidad (git checkout -b feature/NuevaMejora).

Realiza tus cambios y haz un commit descriptivo (git commit -m 'Add: nueva funcionalidad').

Sube tus cambios a tu repositorio (git push origin feature/NuevaMejora).

Abre un Pull Request explicando tus cambios.

## Licencia
Distribuido bajo la licencia MIT. Ve LICENSE para más información.

# Creado  por Pablo Basso
