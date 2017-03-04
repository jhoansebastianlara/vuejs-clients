const models = require('src/models')

module.exports = {

  // Function that creates a provider
  create: (providerData, callback) => {
    models.Provider.create({
      name: providerData.name
    }).then((provider) => {
      callback(null, provider)
    }).catch((err) => {
      callback(err)
    })
  },

  // Function that gets all providers
  findAll: (callback) => {
    models.Provider.findAll().then((providers) => {
      let response = {
        providers: JSON.parse(JSON.stringify(providers))
      }

      callback(null, response)
    }).catch((err) => {
      callback(err)
    })
  },

  // Function that gets a specific provider
  findById: (id, callback) => {
    models.Provider.findById(id).then((provider) => {
      let response = {
        provider: JSON.parse(JSON.stringify(provider))
      }

      callback(null, response)
    }).catch((err) => {
      callback(err)
    })
  },

  // Function that updates a provider
  update: (providerData, callback) => {
    // Verify if the provider exists
    models.Provider.findById(providerData.id).then((provider) => {
      if (provider) {
        // Provider exists, it can be updated
        models.Provider.update({
          name: providerData.name
        }, {
          where: {
            id: providerData.id
          }
        }).then((updated) => {
          callback(null, true)
        }).catch((err) => {
          callback(err)
        })
      } else {
        callback(null, {notFound: true})
      }
    }).catch((err) => {
      callback(err)
    })
  },

  // Function that deletes a provider
  delete: (id, callback) => {
    // first of all, Check if the provider exists
    models.Provider.findById(id).then((provider) => {
      if (provider) {
        // Provider exists, it can be removed
        models.Provider.destroy({
          where: {
            id: id
          }
        }).then((provider) => {
          callback(null, true)
        }).catch((err) => {
          callback(err)
        })
      } else {
        callback(null, {notFound: true})
      }
    }).catch((err) => {
      callback(err)
    })
  }
}
