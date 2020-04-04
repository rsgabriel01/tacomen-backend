const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const matche = sequelize.define(
    "matche",
    {
      userPhaseId: DataTypes.INTEGER,
      jump: DataTypes.INTEGER,
      point: DataTypes.INTEGER,
      timer: DataTypes.TIME,
      enemy_killed: DataTypes.INTEGER,
      death: DataTypes.INTEGER
      
    },
    {
      freezeTableName: true
    //   timestamps: false
    }
  );
  
  matche.associate = (models) => {
    matche.belongsTo(models.userPhase, {foreignKey: 'id'})
  };
  
  sequelizePaginate.paginate(matche);
  return matche;
};
