//Importación de bibliotecas y creación de constantes
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;
const cors = require('cors');

app.use(cors());

app.use(express.json());

//Conexión con mongoDB
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');

    })
    .catch(error => {
        console.error('Error de conexión', error.message);
        process.exit(1);
});    


//RUTAS
const juegoRoutes = require('./routes/juegoRoutes.js');
app.use('/api/juegos', juegoRoutes);

const reseniaRoutes = require('./routes/reseniaRoutes.js');
app.use('/api/resenias', reseniaRoutes);


//Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`)
});

//Casos exito
//201 = a cuando se crea un recurso exitosamente POST
//200 = a cuando se obtiene un recurso exitosamente GET, PUT, DELETE

//Casos error
//400 = a cuando hay un error del cliente (datos incompletos o incorrectos)
//404 = Cuando no se encuentra un recurso
//500 = Cuando hay un error del servidor