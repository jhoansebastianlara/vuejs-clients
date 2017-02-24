// Model definition for Provider entity
module.exports = (sequelize, DataTypes) => {
  var Provider = sequelize.define('provider', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Provider.belongsToMany(models.Client, {
          through: 'client_provider',
          foreignKey: 'provider_id'
        });
      }
    }
  });

  return Provider;
};
