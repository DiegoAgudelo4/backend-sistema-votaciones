const express = require('express');

const router = express.Router();
const { getVoters } = require('../controllers/voterController');

/**
 * @swagger
 * /voters:
 *   get:
 *     summary: Obtiene la lista de votantes con paginación
 *     tags: [Votantes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de la página (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de votantes por página (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de votantes obtenida con éxito.
 *       500:
 *         description: Error al obtener los votantes.
 */

router.get('/', getVoters);

module.exports = router;
