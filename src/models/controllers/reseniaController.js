const Resenia = require('../models/resenia.js');

//C - Crear Reseña

exports.crearResenia = async (req, res) => {
    try {
        const nuevaResenia = new Resenia(req.body);
        await nuevaResenia.save();
        res.status(201).json(nuevaResenia);
    } catch (error) {
        res.status(400).json({
            error: 'Error al agregar la reseña.',
            details: error.message
        });
    }    
}

//R - Obtener Reseñas

exports.obtenerResenias = async (req, res) => {
    try {
        //Filtrar la reseña por el Id del juego enviado
        const filtro = req.query.juegoId ? { juegoId: req.query.juegoId } : {};

        // .populate('juego', 'nombre')trae el nombre del juego relacionado
        const resenias = await Resenia.find(filtro).populate('juegoId', 'nombre');
        res.status(200).json(resenias);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar obtener las reseñas' });
    }
}

exports.obetenerRseniasPorId = async (req, res) => {
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

exports.actualizarResenia = async (req, res) => {
    try {
        const resenia = await Resenia.findByIdAndUpdate(req.params.id);

        if(!resenia){
            return res.status(404).json({ msg: 'Reseña no encontrada para realizar la actualización' });
        }

        res.status(200).json(resenia);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar actualizar la reseña' });
    }
}

// D - Eliminar Reseña

exports.eliminarResenia = async (req, res) => {
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