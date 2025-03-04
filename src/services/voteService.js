const Vote = require('../models/Vote');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');

const getVotes = async () => {
  try {
    const { count, rows: votes } = await Vote.findAndCountAll();

    return {
      total: count,
      votes,
    };
  } catch (error) {
    throw new Error('Error al obtener los votos');
  }
};

const createVote = async (voter_id, candidate_id) => {
  console.log(voter_id, candidate_id);
  const existingVoter = await Voter.findOne({ where: { id: voter_id, available: true } });
  if (!existingVoter) {
    const error = new Error('No existe el votante.');
    error.code = 2;
    throw error;
  }
  const existingVote = await Vote.findOne({ where: { voter_id } });

  if (existingVote) {
    const error = new Error('Solo se puede votar una vez.');
    error.code = 1;
    throw error;
  }
  const existingCandidate = await Candidate.findOne({
    where: { id: candidate_id, available: true },
  });
  if (!existingCandidate) {
    const error = new Error('No existe el Candidato.');
    error.code = 3;
    throw error;
  }
  const candidate = await Vote.create({ voter_id, candidate_id });
  return candidate;
};

module.exports = { getVotes, createVote };
