const Statitics = require('../models/Statitics');
const Vote = require('../models/Vote');

const getStatistics = async () => {
  const { count } = await Vote.findAndCountAll();
  const response = await Statitics.findAll();
  return {
    total_votes: count,
    statitics: response,
  };
};

module.exports = { getStatistics };
