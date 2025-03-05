const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Votaciones API',
      version: '1.0.0',
      description:
        'Documentación de la API RESTful para el sistema de votaciones',
    },
    servers: [
      {
        // entorno
        url: `http://${process.env.PJ_HOST}:3000/v1/api`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/v1/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Swagger disponible en http://${process.env.PJ_HOST}:3000/v1/api/docs`);
};

module.exports = swaggerDocs;
