"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("ranking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {         // user hasmany user_phase n:n
          model: 'user',
          key: 'id'
        }
      },
      total_jump: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      total_point: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      total_time: {
        allowNull: false,
        type: DataTypes.TIME
      },
      total_enemy_killed: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      total_death: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'ranking',
      freezeTableName: true,
      timestamps: false
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("ranking");
  }
};
