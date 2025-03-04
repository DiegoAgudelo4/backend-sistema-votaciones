const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const VoterStatistics = sequelize.define(
  'VoterStatistics',
  {
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    candidate_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vote_percentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: 'voting_statistics',
    timestamps: false,
  },
);

module.exports = VoterStatistics;
