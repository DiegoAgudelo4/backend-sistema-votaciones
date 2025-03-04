const express = require('express');

const router = express.Router();
const { getCandidates, createCandidate, getCandidateById, deleteCandidate } = require('../controllers/candidateController');

/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Obtiene la lista de candidatos con paginación
 *     tags: [Candidates]
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
 *         description: Cantidad de candidatos por página (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de candidatos obtenida con éxito.
 *       500:
 *         description: Error al obtener los candidatos.
 *   post:
 *     summary: Registra un nuevo candidato
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del candidato
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único del candidato
 *     responses:
 *       201:
 *         description: candidato registrado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error al registrar el candidato.
 */

router.get('/', getCandidates);
router.post('/', createCandidate);

/**
 * @swagger
 * /candidates/{id}:
 *   get:
 *     summary: Obtiene un candidato por ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del candidato
 *     responses:
 *       200:
 *         description: Datos del candidato obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: candidato no encontrado.
 *       500:
 *         description: Error al obtener el candidato.
 *   delete:
 *     summary: Eliminación lógica de un candidato (available=false)
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del candidato a eliminar
 *     responses:
 *       200:
 *         description: candidato eliminado correctamente.
 *       404:
 *         description: candidato no encontrado.
 *       500:
 *         description: Error al eliminar el candidato.
 */

router.get('/:id', getCandidateById);
router.delete('/:id', deleteCandidate);

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del candidato
 *         name:
 *           type: string
 *           description: Nombre del candidato
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico único del candidato
 *         party:
 *           type: string
 *           description: Partido al que pertenece el candidato (Opcional)
 *       example:
 *         id: 1
 *         name: "Juan Pérez"
 *         email: "juan@example.com"
 *         party: "partido example"
 */

module.exports = router;
