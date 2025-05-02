const express = require('express');

const router = express.Router();
const { getVoters, createVoter, getVoterById, deleteVoter, getVoterByEmail } = require('../controllers/voterController');

/**
 * @swagger
 * /voters:
 *   get:
 *     summary: Obtiene la lista de votantes con paginación
 *     tags: [Voters]
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
 *   post:
 *     summary: Registra un nuevo votante
 *     tags: [Voters]
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
 *                 description: Nombre del votante
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único del votante
 *     responses:
 *       201:
 *         description: Votante registrado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error al registrar el votante.
 */

router.get('/', getVoters);
router.post('/', createVoter);

/**
 * @swagger
 * /voters/{id}:
 *   get:
 *     summary: Obtiene un votante por ID
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del votante
 *     responses:
 *       200:
 *         description: Datos del votante obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voter'
 *       404:
 *         description: Votante no encontrado.
 *       500:
 *         description: Error al obtener el votante.
 *   delete:
 *     summary: Eliminación lógica de un votante (available=false)
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del votante a eliminar
 *     responses:
 *       200:
 *         description: Votante eliminado correctamente.
 *       404:
 *         description: Votante no encontrado.
 *       500:
 *         description: Error al eliminar el votante.
 * /voters/search/{email}:
 *  get:
 *     summary: Obtiene un votante por email
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: email del votante
 *     responses:
 *       200:
 *         description: Datos del votante obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voter'
 *       404:
 *         description: Votante no encontrado.
 *       500:
 *         description: Error al obtener el votante
 */

router.get('/:id', getVoterById);
router.get('/search/:email', getVoterByEmail);
router.delete('/:id', deleteVoter);

/**
 * @swagger
 * components:
 *   schemas:
 *     Voter:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del votante
 *         name:
 *           type: string
 *           description: Nombre del votante
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico único del votante
 *       example:
 *         id: 1
 *         name: "Juan Pérez"
 *         email: "juan@example.com"
 *         has_voted: false
 */

module.exports = router;
