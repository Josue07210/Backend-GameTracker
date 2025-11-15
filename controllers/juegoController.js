const Juego = require('../models/juego.js');
const resenia = require('../models/resenia.js');

//C - Crear Juego
exports.crearJuego = async (req, res) => {
    try { 
         const nuevoJuego = new Juego(req.body);
         await nuevoJuego.save();
         res.status(201).json(nuevoJuego);
    } catch (error) {
        res.status(400).json({
            error: 'Error al agregar el juego. Verifique cada campo de información.',
            details: error.message
          });    
    }
}

//R - Obtener Juegos

exports.obtenerJuegos = async (req, res) => {
    try { 
        const juegos = await Juego.find();
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar obtener los juegos' 
    });
    }
}

//R - Obtener datos del juego por ID

exports.obtenerJuegoPorId = async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);
        
        if (!juego){
            return res.status(404).json({ error: 'Juego no encontrado' });
        }

        res.status(200).json(juego)

    }   catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar obtener el juego'})
    }
}

//U - Actualizar Juego

exports.actualizaJuego = async (req, res) =>{
    try {
        const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //retorna el juego actualizado
            runValidators: true //valida la base de datos con el esquema
        })
        
        if(!juego){
            return res.status(404).json({ msg: 'Juego no encontrado para realizar la actualización' });
        }

        res.status(201).json(juego);
    } catch (error) {
        res.status(400).json({
            error: 'Error al actualizar el juego. Verifique cada campo de información.',
            details: error.message
          });    
    }      
}

//D - Eliminar Juego

exports.eliminarJuego = async (req, res) =>{
    try {
        const juego = await Juego.findByIdAndDelete(req.params.id);

        if(!juego){
            // Si el juego no se encontró (ya fue eliminado o el ID es incorrecto)
            return res.status(404).json({ msg: 'Juego no encontrado para eliminar' });
        }

        // ⚠️ PLUS: Eliminación de Reseñas Relacionadas (Recomendado)
        // Si tu aplicación usa Reseñas, cuando eliminas un juego, también
        // deberías eliminar todas las reseñas asociadas a él para evitar
        // datos huérfanos.
        await resenia.deleteMany({ juego: req.params.id }); 
        
        res.status(200).json({msg: 'El juego y sus reseñas han sido eliminados exitosamente.'})

    } catch (error) {
        // Es una buena práctica verificar si el error se debe a un ID mal formado
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ error: 'ID de juego no válido' });
        }
        res.status(500).json({ error: 'Error del servidor al intentar eliminar el juego', details: error.message })
    }
}