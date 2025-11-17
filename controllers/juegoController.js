import Juego from '../models/juego.js';

//C - Crear Juego
export const crearJuego = async (req, res) => {
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

export const obtenerJuegos = async (req, res) => {
    try { 
        const juegos = await Juego.find();
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al intentar obtener los juegos' 
    });
    }
}

//R - Obtener datos del juego por ID

export const obtenerJuegoPorId = async (req, res) => {
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

export const actualizaJuego = async (req, res) =>{
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

export const eliminarJuego = async (req, res) =>{
    try {
        const juego = await Juego.findByIdAndDelete(req.params.id);

        if(!juego){
            // Si el juego no se encontró (ya fue eliminado o el ID es incorrecto)
            return res.status(404).json({ msg: 'Juego no encontrado para eliminar' });
        }

        // Si el juego se elimina correctamente,
        // eliminar también todas las reseñas asociadas para evitar
        // datos huérfanos.
        await resenia.deleteMany({ juego: req.params.id }); 
        
        res.status(200).json({msg: 'El juego y sus reseñas han sido eliminados exitosamente.'})

    } catch (error) {
        // Para manejar errores de ID inválido
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ error: 'ID de juego no válido' });
        }
        res.status(500).json({ error: 'Error del servidor al intentar eliminar el juego', details: error.message })
    }
}