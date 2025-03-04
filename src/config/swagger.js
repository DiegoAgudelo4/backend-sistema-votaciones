const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
        //para poder acceder a la documentación es necesario tener en cuenta esto.
        //Ejecucion con npm, sin docker
        // url: 'http://localhost:3000/v1/api', 
        //Ejecucion Con docker
        url: 'http://host.docker.internal:3000/v1/api', 
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/v1/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger disponible en http://localhost:3000/v1/api/docs');
};

module.exports = swaggerDocs;
