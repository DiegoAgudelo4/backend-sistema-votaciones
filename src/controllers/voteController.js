const response = require('../utils/response');
const voteService = require('../services/voteService');

const getVotes = async (req, res) => {
  try {
    const result = await voteService.getVotes();

    response(res, 200, 'Lista de votos obtenida con éxito', result);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message);
  }
};

const createVote = async (req, res) => {
  try {
    const { voter_id, candidate_id } = req.body;
    console.log(voter_id, candidate_id);
    if (!voter_id || !candidate_id) {
      response(res, 400, 'id del votante y el id del candidato son obligatorios');
      return;
    }

    const voter = await voteService.createVote(voter_id, candidate_id);
    response(res, 201, 'Voto registrado con éxito', voter);
  } catch (error) {
    console.log(error);
    if (error.code === 1) {
      response(res, 400, 'Solo se puede votar una vez.');
      return;
    }
    if (error.code === 2) {
      response(res, 400, 'No existe el votante.');
      return;
    }
    if (error.code === 3) {
      response(res, 400, 'No existe el Candidato.');
      return;
    }
    response(res, 500, 'Error al registrar el vote');
  }
};

module.exports = { getVotes, createVote };
