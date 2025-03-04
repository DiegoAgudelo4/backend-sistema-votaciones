const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vote = sequelize.define(
  'Vote',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    voter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'vote',
    timestamps: false,
  },
);

module.exports = Vote;
