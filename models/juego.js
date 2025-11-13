const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del juego es obligatorio'],
        trim: true, 
        unique: true
    },
    genero: {
        type: String,
        required: [true, 'El género del juego es obligatorio'],
        trim: true        
    },
    plataforma: {
        type: String,
        required: [true, 'La plataforma del juego es obligatoria'],
        trim: true
    },
    anioLanzamiento: {   
        type: Number,
        min: 1950,
        max: new Date().getFullYear()
    },
    desarrollador: {
        type: String,
        required: [true, 'El desarrollador del juego es obligatorio'],
        trim: true
    },   
    imagenPortada: {
        type: String,
        required: [true, 'La imagen de portada es obligatoria']       
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del juego es obligatoria'], 
    },
    completado: {
        type: Boolean,
        default: false
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completado'],
        default: 'Pendiente'
    },
},  { 
    timestamps: true 
});

module.exports = mongoose.model('Juego', JuegoSchema);  

