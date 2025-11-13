const express = require('express');
const router = express.Router();
const reseniaController = require('../controllers/reseniaController.js');
const { route } = require('./juegoRoutes.js');

// Rutas CRUD para las resenias (Endpoints: /api/resenias)

router.post('/', reseniaController.crearResenia); //C - Crea Reseña
router.get('/', reseniaController.obtenerResenias); //R - Obtener reseñas
router.get('/:id', reseniaController.obetenerReseniasPorId); //R - Obtener reseña por ID
router.put('/:id', reseniaController.actualizarResenia); //U - Actualizar reseña
router.delete('/:id', reseniaController.eliminarResenia); //D - Eliminar reseña

module.exports = router;