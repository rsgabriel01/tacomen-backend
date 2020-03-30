"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("phase", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'phase',
      freezeTableName: true,
      timestamps: false
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("phase");
  }
};
