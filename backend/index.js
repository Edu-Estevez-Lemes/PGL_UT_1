const express = require("express");
const db = require("./models");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincronizar BD
db.sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada");
}).catch(err => {
  console.error("❌ Error sincronizando:", err);
});

// Ruta raíz simple
app.get("/", (req, res) => {
   res.json({ message: "Bienvenido al Videoclub 🎬" });
});

//Importar las rutas de clientes, peliculas y alquileres
require("./routes/cliente.routes")(app);
require("./routes/pelicula.routes")(app);
require("./routes/alquiler.routes")(app);

// Arrancar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
