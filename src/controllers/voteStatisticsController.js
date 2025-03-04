const response = require('../utils/response');
const voteStatisticsService = require('../services/voteStatisticsService');

const getVoteStatistics = async (req, res) => {
  try {
    const statistics = await voteStatisticsService.getStatistics();
    response(res, 200, 'Estadísticas obtenidas con éxito', statistics);
  } catch (error) {
    console.error(error);
    response(res, 500, 'Error al obtener estadísticas');
  }
};

module.exports = { getVoteStatistics };
