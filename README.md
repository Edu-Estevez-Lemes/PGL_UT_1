# **VERSIÓN EN ESPAÑOL**


## 🎬 _TapeLab_
 Aplicación fullstack desarrollada con Ionic (Angular) y Node.js (Express + Sequelize + MySQL).
Permite gestionar un pequeño videoclub donde puedes añadir, editar y eliminar películas, clientes y alquileres, con una interfaz moderna en tema oscuro.


## 🚀 _Comenzando_
Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.
La aplicación está compuesta por dos partes:

  ### **1.** Backend (Express + Sequelize + MySQL) 
  ### **2.** Frontend (Ionic + Angular) </h2>

  ---

 ## 📋 _Pre-requisitos_

Antes de comenzar, asegúrate de tener instalado:

- Node.js 20+: `https://nodejs.org/en/download`

- MySQL 8+: `https://dev.mysql.com/downloads/installer/`

- Ionic CLI: `npm install -g @ionic/cli`
  
- Git: `https://git-scm.com/downloads`

---

## 🔧 Instalación
### 1️⃣ Clonar el repositorio

`git clone https://github.com/Edu-Estevez-Lemes/PGL_UT_1.git`


### 2️⃣ Configurar el backend

- 1- Entra en la carpeta /backend,
- 2- Allí encontrarás el archivo .env.example con las variables de entorno.
- 3- Instala dependencias:
  
    `npm install`

- 4- Ejecuta los seeders para poblar la base de datos con registros iniciales (películas, clientes y alquileres):

    `npx sequelize-cli db:seed:all`

- 5- Arranca el servidor
  
    `npm start`

> El backend se ejecutará en http://localhost:8080

_El Backend arranca con el archivo index.js:_ `node index.js`

### 3️⃣ Configurar el frontend

- 1- Entra en la carpeta /frontend

- 2- Instala dependencias:

  `npm install`

- 3- Arranca el servidor de desarrollo:

  `ionic serve`

  > La app se abrirá en http://localhost:8100

  ---

## ⚙️ Ejecutando pruebas básicas

Comprueba que puedes acceder a los endpoints desde POSTMAN:

### 🚨 ¡Importante: Autenticación Requerida! 🚨

  El backend ha implementado Token Bearer y Autenticación Básica (Basic Auth), junto con bcrypt para la seguridad de contraseñas. Por lo tanto, debes autenticarte en Postman antes de intentar acceder a los endpoints del CRUD.

  Para realizar las pruebas:

  Autenticación: Usa los métodos de autenticación (Basic Auth o Bearer Token) proporcionados por la aplicación en tu cliente de Postman (o la cabecera Authorization manual).

#### Endpoints de Prueba: Una vez autenticado, verifica que puedes interactuar con las siguientes rutas:

  **GET** /api/peliculas; **POST** /api/peliculas; **DELETE** /api/peliculas; **PUT** /api/peliculas

  **GET** /api/clientes; **POST** /api/clientes; **DELETE** /api/clientes; **PUT** /api/clientes

  **GET** /api/alquileres; **POST** /api/alquileres; **DELETE** /api/alquileres; **PUT** /api/alquileres


ENLACE ENDPOINTS POSTMAN: `https://www.postman.com/eduardoestevezlemes/workspace/pgl-public/collection/38847486-14d35469-ee56-48a9-928c-57e9fa55c451?action=share&source=copy-link&creator=38847486`


Verifica que puedes crear, editar y eliminar registros desde la interfaz.

### 🧪 Colecciones de Postman

Colecciones públicas con los endpoints del backend:

📁 Clientes

🎞️ Películas

🛒 Alquileres

### 💡 Todos los endpoints usan la misma API base:
> http://localhost:8080/api

---

## URL´s de la aplicación

Pantalla	Descripción
- 🏠 Inicio: `http://localhost:8100/home`	-- Acceso rápido a las secciones Películas, Clientes y Alquileres

- 🎞️ Películas: `http://localhost:8100/videoclub-list`	-- CRUD completo de películas

- 👥 Clientes: `http://localhost:8100/clientes-list`	 -- Gestión de usuarios del videoclub

- 🛒 Alquileres: `http://localhost:8100/alquileres-list` 	-- Asignación de películas a clientes, con fechas y precio automático

### El POST en la aplicación se realiza pulsando el + en la esquina superior derecha (Círculo amarillo). El PUT y el DELETE están en la misma línea del registro.

---

## ✒️ Autor

### Eduardo Estévez Lemes
💻 Desarrollador del proyecto TapeLab (PGL – UT_1)

---

## 📜 Licencia

Este proyecto se entrega con fines educativos dentro del módulo Desarrollo de Aplicaciones Móviles (PGL).
Uso libre para aprendizaje y prácticas personales.

---




# **ENGLISH VERSION**


## 🎬 **_TapeLab_**

Full-stack application developed with Ionic (Angular) and Node.js (Express + Sequelize + MySQL).
It allows managing a small video club where you can add, edit, and delete movies, clients, and rentals, all within a modern dark-themed interface.

## 🚀 **_Getting Started_**

These instructions will help you get a working copy of the project on your local machine for development and testing purposes.
The application is composed of two main parts:

### **1.** Backend (Express + Sequelize + MySQL)
### **2.** Frontend (Ionic + Angular)


## 📋 **_Prerequisites_**

Before you begin, make sure you have the following installed:

- Node.js 20+: `https://nodejs.org/en/download`

- MySQL 8+: `https://dev.mysql.com/downloads/installer/`

- Ionic CLI: npm install -g @ionic/cli

- Git: `https://git-scm.com/downloads`

## 🔧 **_Installation_**

### 1️⃣ Clone the repository
git clone `https://github.com/Edu-Estevez-Lemes/PGL_UT_1.git`

### 2️⃣ Set up the backend

- 1- Navigate to the /backend folder.

- 2- There you will find the .env.example file with the environment variables.

- 3- Install dependencies and start the server:

`npm install`
`npm start`


> The backend will run on `http://localhost:8080`

_Backend starts using the file index.js_ → `node index.js`

### 3️⃣ Set up the frontend

- 1- Navigate to the /frontend folder.

- 2- Install dependencies:

`npm install`

- 3- Start the development server:

`ionic serve`


> The app will open at `http://localhost:8100`

## ⚙️ **_Basic Testing_**

Make sure you can access the endpoints from Postman:
Postman Collection Link:
`https://www.postman.com/eduardoestevezlemes/workspace/pgl-public/collection/38847486-14d35469-ee56-48a9-928c-57e9fa55c451?action=share&source=copy-link&creator=38847486`

### 🎞️ Available Endpoints

- **GET** /api/peliculas; **POST** /api/peliculas; **DELETE** /api/peliculas; **PUT** /api/peliculas

- **GET** /api/clientes; **POST** /api/clientes; **DELETE** /api/clientes; **PUT** /api/clientes

- **GET** /api/alquileres; **POST** /api/alquileres; **DELETE** /api/alquileres; **PUT** /api/alquileres

> Verify that you can create, edit, and delete records from the interface.

## 🧪 **_Postman Collections_**

Public collections with backend endpoints:

📁 Clients
🎞️ Movies
🛒 Rentals

### 💡 All endpoints share the same base API:

> `http://localhost:8080/api`

### 🌐 Application URLs
Screen	Description
- 🏠 Home: `http://localhost:8100/home`	Quick access to Movies, Clients, and Rentals
- 🎞️ Movies: `http://localhost:8100/videoclub-list`	Full CRUD management for movies
- 👥 Clients: `http://localhost:8100/clientes-list`	Client management section
- 🛒 Rentals: `http://localhost:8100/alquileres-list`	Assign movies to clients with dates and automatic pricing

📌 The POST operation is done by clicking the yellow “+” button at the top-right corner.
PUT and DELETE are available within the same record line.


## ✒️ _Author_ 

### Eduardo Estévez Lemes
💻 Developer of the TapeLab project (PGL – UT_1)

## 📜 _License_

This project is delivered for educational purposes as part of the Mobile Application Development (PGL) module.
Free to use for learning and personal practice.