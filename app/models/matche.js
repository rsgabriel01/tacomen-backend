const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const matche = sequelize.define(
    "matche",
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
  
  matche.associate = (models) => {
    matche.belongsTo(models.user, {foreignKey: 'id'})
    matche.belongsTo(models.phase, {foreignKey: 'id'})
  };
  
  sequelizePaginate.paginate(matche);
  return matche;
};
