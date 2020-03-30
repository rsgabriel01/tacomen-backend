 const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  user.associate = (models) => {
    user.belongsToMany(models.phase,{
      through: models.matche,
      as: 'phases',
      foreignkey: 'userId',
    });
    user.hasMany(models.ranking, {
      foreignKey: 'userId'
    });

  }
  

  sequelizePaginate.paginate(user);
  return user;
};
