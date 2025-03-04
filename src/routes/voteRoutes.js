const express = require('express');
const { getVotes, createVote } = require('../controllers/voteController');
const { getVoteStatistics } = require('../controllers/voteStatisticsController');

const router = express.Router();

/**
 * @swagger
 * /votes:
 *   get:
 *     summary: Obtiene la lista de votos.
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: Lista de votos obtenida con éxito.
 *       500:
 *         description: Error al obtener los votos.
 *   post:
 *     summary: Registra un nuevo candidato
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - voter_id
 *               - candidate_id
 *             properties:
 *               voter_id:
 *                 type: integer
 *                 description: id del votante
 *               candidate_id:
 *                 type: integer
 *                 description: id del candidato
 *     responses:
 *       201:
 *         description: Voto registrado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error al registrar el voto.
 */

router.get('/', getVotes);
router.post('/', createVote);

/**
 * @swagger
 * /votes/statistics:
 *   get:
 *     summary: Obtiene estadísticas de votación.
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas con éxito.
 *       500:
 *         description: Error al obtener estadísticas.
 */
router.get('/statistics', getVoteStatistics);

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del voto
 *         voter_id:
 *           type: integer
 *           description: ID del votante.
 *         candidate_id:
 *           type: integer
 *           description: Id del Candidato Votado
 *       example:
 *         id: 1
 *         voter_id: 1
 *         candidate_id: 2
 */

module.exports = router;
