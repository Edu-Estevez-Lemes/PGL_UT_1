# 🎬 _TapeLab_
 Aplicación fullstack desarrollada con Ionic (Angular) y Node.js (Express + Sequelize + MySQL).
Permite gestionar un pequeño videoclub donde puedes añadir, editar y eliminar películas, clientes y alquileres, con una interfaz moderna en tema oscuro.


# 🚀 _Comenzando_
Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.
La aplicación está compuesta por dos partes:

  ## **1.** Backend (Express + Sequelize + MySQL) 
  ## **2.** Frontend (Ionic + Angular) </h2>

  ---

 # 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js 20+: `https://nodejs.org/en/download`

- MySQL 8+: `https://dev.mysql.com/downloads/installer/`

- Ionic CLI: `npm install -g @ionic/cli`
  
- Git: `https://git-scm.com/downloads`

---

# 🔧 Instalación
### 1️⃣ Clonar el repositorio

`git clone https://github.com/Edu-Estevez-Lemes/PGL_UT_1.git`


### 2️⃣ Configurar el backend

- 1- Entra en la carpeta /backend,
- 2- Allí encontrarás el archivo .env.example con las variables de entorno.
- 3- Instala dependencias y arranca el servidor:
  
    `npm install`
  
    `npm start`

> El backend se ejecutará en http://localhost:8080

_El Backend arranca con el archivo index.js_ `node index.js`

### 3️⃣ Configurar el frontend

- 1- Entra en la carpeta /frontend

- 2- Instala dependencias:

  `npm install`
- 3- Arranca el servidor de desarrollo:

  `ionic serve`

  > La app se abrirá en http://localhost:8100

  ---

# ⚙️ Ejecutando pruebas básicas

Comprueba que puedes acceder a los endpoints desde POSTMAN:
ENLACE ENDPOINTS POSTMAN: `https://www.postman.com/eduardoestevezlemes/workspace/pgl-public/collection/38847486-14d35469-ee56-48a9-928c-57e9fa55c451?action=share&source=copy-link&creator=38847486`


- _**GET** /api/peliculas; **POST** /api/peliculas; **DELETE** /api/peliculas; **PUT** /api/peliculas_

- _**GET** /api/clientes; **POST** /api/clientes; **DELETE** /api/clientes; **PUT** /api/clientes_

- _**GET** /api/alquileres; **POST** /api/alquileres; **DELETE** /api/alquileres; **PUT** /api/alquileres_

Verifica que puedes crear, editar y eliminar registros desde la interfaz.

## 🧪 Colecciones de Postman

Colecciones públicas con los endpoints del backend:

📁 Clientes

🎞️ Películas

🛒 Alquileres

### 💡 Todos los endpoints usan la misma API base:
> http://localhost:8080/api

---

# URL´s de la aplicación

Pantalla	Descripción
- 🏠 Inicio: `http://localhost:8100/home`	-- Acceso rápido a las secciones Películas, Clientes y Alquileres

- 🎞️ Películas: `http://localhost:8100/videoclub-list`	-- CRUD completo de películas

- 👥 Clientes: `http://localhost:8100/clientes-list`	 -- Gestión de usuarios del videoclub

- 🛒 Alquileres: `http://localhost:8100/alquileres-list` 	-- Asignación de películas a clientes, con fechas y precio automático


---

### 💾🗂️ Datos de tablas.

Dentro de la raiz del proyecto se encuentra la carpeta _tables imports_. En ella se encuentran en formato .json los datos de los registros de las tablas. Datos que se pueden importar desde _Workbench_ a cada tabla.
Son registros para empezar a probar la aplicación.

---


# ✒️ Autor

### Eduardo Estévez Lemes
💻 Desarrollador del proyecto TapeLab (PGL – UT_1)

---

# 📜 Licencia

Este proyecto se entrega con fines educativos dentro del módulo Desarrollo de Aplicaciones Móviles (PGL).
Uso libre para aprendizaje y prácticas personales.

---


