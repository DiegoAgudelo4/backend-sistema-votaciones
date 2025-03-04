const Voter = require('../models/Voter');

const getVoters = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const { count, rows: voters } = await Voter.findAndCountAll({
      where: { available: true },
      attributes: { exclude: ['available'] },
      limit,
      offset,
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      voters,
    };
  } catch (error) {
    throw new Error('Error al obtener los votantes');
  }
};

const createVoter = async (name, email) => {
  const existingVoter = await Voter.findOne({ where: { email } });
  if (existingVoter) {
    const error = new Error('El correo electrónico ya está registrado');
    error.code = 1;
    throw error;
  }

  await Voter.create({ name, email });
};

const getVoterById = async (id) => {
  const response = await Voter.findOne({
    where: { id, available: true },
    attributes: { exclude: ['available'] },
  });
  return response;
};

const deleteVoter = async (id) => {
  const voter = await Voter.findOne({ where: { id, available: true } });
  if (!voter) {
    return null;
  }

  await voter.update({ available: false });
  return voter;
};

module.exports = { getVoters, createVoter, getVoterById, deleteVoter };
