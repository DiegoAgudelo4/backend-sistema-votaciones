const Voter = require('../models/Voter');
const response = require('../utils/response');

const getVoters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: voters } = await Voter.findAndCountAll({
      where: { available: true },
      attributes: { exclude: ['available'] },
      limit,
      offset,
    });

    response(res, 200, 'Lista de votantes obtenida con éxito', {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      voters,
    });
  } catch (error) {
    console.log(error);
    response(res, 500, 'Error al obtener los votantes');
  }
};

module.exports = { getVoters };
