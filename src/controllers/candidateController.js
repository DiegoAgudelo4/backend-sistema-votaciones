const response = require('../utils/response');
const candidateService = require('../services/candidateService');

const getCandidates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await candidateService.getCandidates(page, limit);

    response(res, 200, 'Lista de candidatos obtenida con éxito', result);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message);
  }
};
const createCandidate = async (req, res) => {
  try {
    const { name, email, party } = req.body;
    if (!name || !email) {
      response(res, 400, 'Nombre y correo son obligatorios');
      return;
    }

    const voter = await candidateService.createCandidate(name, email, party);
    response(res, 201, 'Candidato registrado con éxito', voter);
  } catch (error) {
    console.log(error);
    if (error.code === 1) {
      response(res, 400, 'El correo electrónico ya está registrado');
      return;
    }
    if (error.code === 2) {
      response(res, 400, 'El candidato no puede ser candidato');
      return;
    }
    response(res, 500, 'Error al registrar el candidato');
  }
};

const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const voter = await candidateService.getCandidateById(id);

    if (!voter) {
      response(res, 404, 'Candidato no encontrado');
      return;
    }

    response(res, 200, 'Candidato encontrado', voter);
  } catch (error) {
    console.log(error);
    response(res, 500, 'Error al obtener el candidato');
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const voter = await candidateService.deleteCandidate(id);

    if (!voter) {
      response(res, 404, 'Candidato no encontrado');
      return;
    }

    response(res, 200, 'Candidato eliminado correctamente');
  } catch (error) {
    console.log(error);
    response(res, 500, 'Error al eliminar el candidato');
  }
};

module.exports = { getCandidates, createCandidate, getCandidateById, deleteCandidate };
