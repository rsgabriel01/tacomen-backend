const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const userPhase = sequelize.define(
    "userPhase",
    {
      userId: DataTypes.INTEGER,
      phaseId: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  
  userPhase.associate = (models) => {
    userPhase.hasMany(models.matche, {foreignKey: 'userPhaseMatcheId'});
    userPhase.belongsTo(models.user, {foreignKey: 'id'});
    userPhase.belongsTo(models.phase, {foreignKey: 'id'});
  };
  
  sequelizePaginate.paginate(userPhase);
  return userPhase;
};
