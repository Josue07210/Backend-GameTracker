//Importacio+ón de bibliotecas y creación de constantes
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`)});