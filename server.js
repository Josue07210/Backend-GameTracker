// Importación de bibliotecas y creación de constantes
import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión con MongoDB
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error de conexión', error.message);
    process.exit(1);
  });

// RUTAS (ahora usando import dinámico)
import juegoRoutes from './routes/juegoRoutes.js';
app.use('/api/juegos', juegoRoutes);

import reseniaRoutes from './routes/reseniaRoutes.js';
app.use('/api/resenias', reseniaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

/*
Casos éxito:
201 = Recurso creado exitosamente (POST)
200 = Recurso obtenido exitosamente (GET, PUT, DELETE)

Casos error:
400 = Error del cliente (datos incompletos o incorrectos)
404 = Recurso no encontrado
500 = Error del servidor
*/
