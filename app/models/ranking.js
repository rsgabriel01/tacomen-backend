const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const ranking = sequelize.define(
    "ranking",
    {
      userId: DataTypes.INTEGER,
      total_jump: DataTypes.INTEGER,
      total_point: DataTypes.INTEGER,
      total_time: DataTypes.TIME,
      total_enemy_killed: DataTypes.INTEGER,
      total_death: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  
  ranking.associate = (models) => {
    ranking.belongsTo(models.user, {foreignKey: 'id'})
  };
  
  sequelizePaginate.paginate(ranking);
  return ranking;
};
