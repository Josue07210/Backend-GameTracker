import express from 'express';
import * as reseniaController from '../controllers/reseniaController.js';
import { obtenerReseniasPorJuego } from '../controllers/reseniaController.js';
const router = express.Router();

// Rutas CRUD para las resenias (Endpoints: /api/resenias)

router.post('/', reseniaController.crearResenia); //C - Crea Reseña
router.get('/juego/:juegoId', obtenerReseniasPorJuego); //R - Obtener Reseñas por ID de Juego 
router.get('/:id', reseniaController.obtenerReseniasPorId); //R - Obtener reseña por ID
router.put('/:id', reseniaController.actualizarResenia); //U - Actualizar reseña
router.delete('/:id', reseniaController.eliminarResenia); //D - Eliminar reseña

export default router;