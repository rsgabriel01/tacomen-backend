"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("userPhase", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {         
          model: 'user',
          key: 'id'
        }
      },
      phaseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {         
          model: 'phase',
          key: 'id'
        }
      }
    },
    {
      tableName: 'userPhase',
      freezeTableName: true,
      timestamps: true
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("userPhase");
  }
};
