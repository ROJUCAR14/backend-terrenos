const express = require('express');
const cors = require('cors');
const propiedadesRoutes = require('./routes/propiedades');
const authRoutes = require('./routes/auth'); // <-- nuevo
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Hacer pública la carpeta de imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/terrenos', propiedadesRoutes);
app.use('/api', authRoutes); // <-- agrega esta línea

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
