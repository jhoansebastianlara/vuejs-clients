// Model definition for Client entity
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('client', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Client.belongsToMany(models.Provider, {
          through: 'client_provider',
          foreignKey: 'client_id'
        });
      }
    }
  });

  return Client;
};
