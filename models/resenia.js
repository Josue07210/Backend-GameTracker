import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReseniaSchema = new Schema({
    // Relaciona la reseña con un juego especifico
    juegoId: {
        type: Schema.Types.ObjectId,
        ref: 'Juego', //Rerente al modelo Juego
        required: true
    },
    tituloResenia: { 
        type: String,
        required: [true, 'El título de la reseña es obligatorio'],
        trim: true
    },
    puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }, 
    textoResenia: {
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
    recomendaria: {
        type: Boolean,
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completado'],
        default: 'Pendiente',
        required: [true, 'El estado del juego es obligatorio']
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Resenia', ReseniaSchema);    