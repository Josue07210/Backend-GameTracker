const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReseniaSchema = new Schema({
    // Relaciona la reseña con un juego especifico
    juegoId: {
        type: Schema.Types.ObjectId,
        ref: 'Juego', //Rerente al modelo Juego
        required: true
    },
    puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }, 
    textoresenia: {
        type: String,
        required: [true, 'El texto de la reseña es obligatorio']
    },
    autor: {
        type: String,
        default: 'Usuario GameTracker'
    },
    horasJugadas: {
        type: Number,
        min: 0,
        default: 0
    },
    recomendaría: {
        type: Boolean,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Resenia', ReseniaSchema);