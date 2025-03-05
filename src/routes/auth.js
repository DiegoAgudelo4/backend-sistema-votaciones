const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 example: Clave_super_segura
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Autenticación exitosa, devuelve el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación.
 *       401:
 *         description: Credenciales incorrectas.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/login', login);

module.exports = router;
