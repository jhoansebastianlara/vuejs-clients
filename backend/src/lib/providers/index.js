const models = require('src/models');

module.exports = {

  // Function that creates a provider
  create: (providerData, callback) => {
    models.Provider.create({
      name: providerData.name
    }).then((provider) => {
      callback(null, provider);
    }).catch((err) => {
      callback(err);
    });
  },

  // Function that gets all providers
  findAll: (callback) => {
    models.Provider.findAll().then((providers) => {
      let response = {
        providers: JSON.parse(JSON.stringify(providers))
      };

      callback(null, response);
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
  },

  // Function that gets a specific provider
  findById: (id, callback) => {
    models.Provider.findById(id).then((provider) => {
      let response = {
        provider: JSON.parse(JSON.stringify(provider))
      };

      callback(null, response);
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
  },

  // Function that updates a provider
  update: (providerData, callback) => {
    models.Provider.update({
      name: providerData.name
    }, {
      where: {
        id: providerData.id
      }
    }).then((updated) => {
      callback(null, updated);
    }).catch((err) => {
      callback(err);
    });
  },

  // Function that deletes a provider
  delete: (id, callback) => {
    models.Provider.destroy({
      where: {
        id: id
      }
    }).then((provider) => {
      callback(null, provider);
    }).catch((err) => {
      callback(err);
    });
  }
};
