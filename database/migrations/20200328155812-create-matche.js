"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("matche", {
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
      phaseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {         // user hasMany user_phase n:n
          model: 'phase',
          key: 'id'
        }
      },
      jump: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      point: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      timer: {
        allowNull: false,
        type: DataTypes.TIME
      },
      enemy_killed: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      death: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      date_time: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      tableName: 'matche',
      freezeTableName: true,
      timestamps: true
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("matche");
  }
};
