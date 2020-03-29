const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const user_phase = sequelize.define(
    "user_phase",
    {
      userId: DataTypes.STRING,
      phaseId: DataTypes.STRING,
      jump: DataTypes.STRING,
      point: DataTypes.STRING,
      timer: DataTypes.STRING,
      enemy_killed: DataTypes.STRING,
      death: DataTypes.STRING
      
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  
  user_phase.associate = (models) => {
    user_phase.belongsTo(models.user, {foreignKey: 'id'})
    user_phase.belongsTo(models.phase, {foreignKey: 'id'})
  };
  
  sequelizePaginate.paginate(user_phase);
  return user_phase;
};
