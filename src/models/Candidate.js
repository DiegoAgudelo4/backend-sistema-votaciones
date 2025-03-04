const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Candidate = sequelize.define(
  'Candidate',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    party: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    votes: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'candidate',
    timestamps: false,
  },
);

module.exports = Candidate;
