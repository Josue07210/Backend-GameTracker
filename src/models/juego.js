const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [True, 'El nombre del juego es obligatorio']
        trim: true, 
    }


}) //https://github.com/Josue07210/Backend-GameTracker.git