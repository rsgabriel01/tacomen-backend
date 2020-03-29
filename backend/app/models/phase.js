const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const phase = sequelize.define(
    "phase",
    {
      name: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  phase.associate = (models) => {
    phase.belongsToMany(models.user,{
      through: models.user_phase,
      as: 'users',
      foreignkey: 'phaseId',
    });
  }

  sequelizePaginate.paginate(phase);
  return phase;
};
