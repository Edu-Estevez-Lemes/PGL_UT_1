require('dotenv').config();
const express = require("express");
const db = require("./models");
const cors = require("cors");
const { config } = require('dotenv');

const app = express();

app.use(cors({ origin: "http://localhost:8100" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincronización con la BBDD
db.sequelize.sync().then(() => {
  console.log("✅✅✅ Base de datos sincronizada ✅✅✅");
}).catch(err => {
  console.error("❌❌❌ ERROR DE SINCRONIZACIÓN ❌❌❌:", err);
});

// Ruta raíz
app.get("/", (req, res) => {
   res.json({ message: "Bienvenido al Videoclub 🎬" });
});

//Importar las rutas de clientes, peliculas y alquileres
require("./routes/cliente.routes")(app);
require("./routes/pelicula.routes")(app);
require("./routes/alquiler.routes")(app);

// Arrancar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
