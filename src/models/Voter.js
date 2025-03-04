const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Voter = sequelize.define(
  'Voter',
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
    has_voted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'voter',
    timestamps: false,
  },
);

module.exports = Voter;
