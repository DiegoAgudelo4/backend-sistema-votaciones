const response = require('../utils/response');
const voterService = require('../services/voterService');

const getVoters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await voterService.getVoters(page, limit);

    response(res, 200, 'Lista de votantes obtenida con éxito', result);
  } catch (error) {
    console.log(error);
    response(res, 500, error.message);
  }
};
const createVoter = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      response(res, 400, 'Nombre y correo son obligatorios');
      return;
    }

    const voter = await voterService.createVoter(name, email);
    response(res, 201, 'Votante registrado con éxito', voter);
  } catch (error) {
    console.log(error);
    if (error.code === 1) {
      response(res, 400, 'El correo electrónico ya está registrado');
      return;
    }
    response(res, 500, 'Error al registrar el votante');
  }
};

const getVoterById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("se está abriendo con id")
    const voter = await voterService.getVoterById(id);

    if (!voter) {
      response(res, 404, 'Votante no encontrado');
      return;
    }

    response(res, 200, 'Votante encontrado', voter);
  } catch (error) {
    console.log(error);
    response(res, 500, 'Error al obtener el votante');
  }
};
const getVoterByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Email Recibido en controller: "+ email)
    const voter = await voterService.getVoterEmail(email);

    if (!voter) {
      response(res, 404, 'Votante no encontrado');
      return;
    }

    response(res, 200, 'Votante encontrado', voter);
  } catch (error) {
    console.log(error);
    response(res, 500, 'Error al obtener el votante');
  }
};

const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const voter = await voterService.deleteVoter(id);

    if (!voter) {
      response(res, 404, 'Votante no encontrado');
      return;
    }

    response(res, 200, 'Votante eliminado correctamente');
  } catch (error) {
    console.log(error);
    response(res, 500, 'Error al eliminar el votante');
  }
};

module.exports = { getVoters, createVoter, getVoterById, deleteVoter, getVoterByEmail };
