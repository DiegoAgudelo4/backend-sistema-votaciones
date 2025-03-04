const express = require('express');
const { getVotes, createVote} = require('../controllers/voteController');

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

module.exports = router;
