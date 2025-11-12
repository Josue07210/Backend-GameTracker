const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [True, 'El nombre del juego es obligatorio'],
        trim: true, 
        unique: true
    },
    genero: {
        type: String,
        required: [True, 'El género del juego es obligatorio'],
        trim: true        
    },
    plataforma: {
        type: String,
        required: [True, 'La plataforma del juego es obligatoria'],
        trim: true
    },
    anioLanzamiento: {   
        type: Number,
        min: 1950,
        max: new Date().getFullYear()
    },
    desarrollador: {
        type: String,
        required: [True, 'El desarrollador del juego es obligatorio'],
        trim: true
    },   
    imagenPortada: {
        type: String,
        required: [True, 'La imagen de portada es obligatoria']       
    },
    descripcion: {
        type: String,
        required: [True, 'La descripción del juego es obligatoria'], 
    },
    completado: {
        type: Boolean,
        default: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now   
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completado'],
        default: 'Pendiente'
    },
    horasJugadas: {
        type: Number,
        min: 0,
        default: 0
    }
},  { 
    timestamps: true 
});

module.exports = mongoose.model('Juego', JuegoSchema);  

