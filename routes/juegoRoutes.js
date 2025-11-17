import express from 'express';
import * as juegoController from '../controllers/juegoController.js';
const router = express.Router();

// Rutas CRUD para los juegos (Endpoints: /api/juegos)

router.post('/', juegoController.crearJuego); //C - Crear Juego
router.get('/', juegoController.obtenerJuegos); //R - Obtener Juegos
router.get('/:id', juegoController.obtenerJuegoPorId); //R - Obtener Juego por ID
router.put('/:id', juegoController.actualizaJuego); //U - Actualizar Juego      
router.delete('/:id', juegoController.eliminarJuego); //D - Eliminar Juego

export default router;