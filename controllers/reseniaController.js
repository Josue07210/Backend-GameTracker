import Resenia from '../models/resenia.js';
import Juego from '../models/juego.js';

//C - Crear Reseña

export const crearResenia = async (req, res) => {

    // 1. Validación básica
   const { juegoId, puntuacion, autor, titulo, contenido, horasJugadas, estado, recomienda } = req.body; 

    // 1. Validación básica (de dónde vienen las variables)
    if (!juegoId || !puntuacion || !autor) {
        return res.status(400).json({ msg: 'Todos los campos obligatorios (juegoId, puntuacion, autor) son requeridos.' });
    }
    try {
        const nuevaResenia = new Resenia(req.body);
        await nuevaResenia.save();
        res.status(201).json(nuevaResenia);
        // Verifica si el juego existe
        const juegoExiste = await Juego.findById(juegoId);
        if (!juegoExiste) {
            return res.status(404).json({ msg: 'Juego no encontrado.' });
        }

    } catch (error) {
        res.status(400).json({
            error: 'Error al agregar la reseña.',
            details: error.message
        });
    }    
}

//R - Obtener Reseñas

// R - Obtener Reseñas por ID de Juego

export const obtenerReseniasPorJuego = async (req, res) => { // 🔄 Cambiado a export const
    // Tomamos el ID del juego de los parámetros de la URL
    const { juegoId } = req.params; 

    try {
        // Buscar todas las reseñas que apunten a ese juegoId
        // Usamos .populate() si queremos que devuelva el nombre del juego
        const resenias = await Resenia.find({ juegoId: juegoId }).populate('juegoId', 'nombre'); 
        
        res.status(200).json(resenias);
        
    } catch (error) {
        console.error('Error al obtener reseñas por juego:', error);
        res.status(500).json({ error: 'Error del servidor al intentar obtener las reseñas' });
    }
}

export const obtenerReseniasPorId = async (req, res) => {
    try {
        const resenia = await Resenia.findById(req.params.id).populate('juegoId', 'nombre');

        if(!resenia){
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        res.status(200).json(resenia);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar obtener la reseña' });
    }
}

//U - Actualizar Reseña

export const actualizarResenia = async (req, res) => {
    const { titulo, contenido, puntuacion, autor, horasJugadas, estado, recomienda } = req.body;

    try {
        const reseniaActualizada = await Resenia.findByIdAndUpdate(
            req.params.id,
            {
                tituloResenia: titulo,
                textoResenia: contenido,
                puntuacion,
                autor,
                horasJugadas,
                estado,
                recomendaria: recomienda
            },
            { new: true, runValidators: true } // Devuelve el documento actualizado y validado
        );

        if (!reseniaActualizada) {
            return res.status(404).json({ msg: 'Reseña no encontrada para actualizar' });
        }

        res.status(200).json(reseniaActualizada);
    } catch (error) {
        console.error('Error al actualizar reseña:', error);
        res.status(500).json({ error: 'Error del servidor al intentar actualizar la reseña' });
    }
};


// D - Eliminar Reseña

export const eliminarResenia = async (req, res) => {
    try {
        const resenia = await Resenia.findByIdAndDelete(req.params.id);

        if(!resenia){
            return res.status(404).json({ msg: 'Reseña no encontrada para eliminar' });
        }

        res.status(200).json({ msg: 'Reseña eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar eliminar la reseña' });
    }
}