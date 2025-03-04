const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// swagger
const swaggerDocs = require('./config/swagger');
const middlewares = require('./middlewares/errorHandler');

const index = require('./api/index');
const voterRoutes = require('./routes/voterRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/', index);
app.use('/v1/api/voters', voterRoutes);
app.use('/v1/api/candidates', candidateRoutes);
app.use('/v1/api/votes', voteRoutes);

// agregar swagger
swaggerDocs(app);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
