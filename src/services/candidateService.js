const Candidate = require('../models/Candidate');
const Voter = require('../models/Voter');

const getCandidates = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const { count, rows: candidates } = await Candidate.findAndCountAll({
      where: { available: true },
      attributes: { exclude: ['available'] },
      limit,
      offset,
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      candidates,
    };
  } catch (error) {
    throw new Error('Error al obtener los votantes');
  }
};

const createCandidate = async (name, email, party) => {
  const existingCandidate = await Candidate.findOne({ where: { email } });
  const existingVoter = await Voter.findOne({ where: { email } });
  if (existingCandidate) {
    const error = new Error('El correo electrónico ya está registrado');
    error.code = 1;
    throw error;
  }
  if (existingVoter) {
    const error = new Error('El Candidato no puede ser votante.');
    error.code = 2;
    throw error;
  }

  const candidate = await Candidate.create({ name, email, party, available: true });
  return candidate;
};

const getCandidateById = async (id) => {
  const response = await Candidate.findOne({
    where: { id, available: true },
    attributes: { exclude: ['available'] },
  });
  return response;
};

const deleteCandidate = async (id) => {
  const voter = await Candidate.findOne({ where: { id, available: true } });
  if (!voter) {
    return null;
  }

  await voter.update({ available: false });
  return voter;
};

module.exports = { getCandidates, createCandidate, getCandidateById, deleteCandidate };
