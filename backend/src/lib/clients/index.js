const models = require('src/models')
const constants = require('src/shared/constants')

var Client = {

  /**
  * Function that creates a client
  * @param clientData with name, email and phone of client. Optional array of
  * providers ids to assign.
  * @param callback(err, createdClient)
  */
  create: (clientData, callback) => {
    models.Client.create({
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone
    }).then((client) => {
      // Add providers through relationship
      if (clientData.providers) {
        // Find providers to assign on client
        models.Provider.findAll({
          where: {
            id: { $in: clientData.providers }
          }
        }).then((providers) => {
          client.setProviders(providers).then(() => {
            // Saved providers
            callback(null, client)
          })
        })
      } else {
        callback(null, client)
      }
    }).catch((err) => {
      callback(err)
    })
  },

  /**
  * Function for searching clients list. Filtered by given data on query object,
  * and sorting using sortField and sortType ('ASC', 'DESC').
  * @param query
  * @param callback(err, clients)
  */
  find: (query, callback) => {
    if (!callback) {
      callback = query
      query = {}
    }

    if (query.sortField) {
      // Verify if is a valid sort field
      let index = ['id', 'name', 'email'].findIndex(item => {return item == query.sortField})

      if (index == -1) {
        // sortField unknow, it's ignored
        query.sortField = null
      }
    }

    // Variable to define params for querying
    let queryParams = {
      // Populate belongsToMany relationship with provider_id only
      include: [{
        model: models.Provider,
        attributes: ['id'],
        through: { attributes: [] }
      }],
      where: {},
      // Default sort by id and DESC
      order: [[query.sortField ? query.sortField : 'id', query.sortType == 'ASC' ? query.sortType : 'DESC']]
    }

    if (query.id) {
      queryParams.where.id = query.id
    }
    // If name in query, use like for filtering
    if (query.name) {
      queryParams.where.name = {
        $like: '%' + query.name + '%'
      }
    }
    // If email in query, use like for filtering
    if (query.email) {
      queryParams.where.email = {
        $like: '%' + query.email + '%'
      }
    }
    // If phone in query, use like for filtering
    if (query.phone) {
      queryParams.where.phone = {
        $like: '%' + query.phone + '%'
      }
    }

    // free search
    if (query.search) {
      queryParams.where.$or = [{
          name: {$like: '%' + query.search + '%'}
        }, {
          email: {$like: '%' + query.search + '%'}
        }, {
          phone: {$like: '%' + query.search + '%'}
      }]
    }

    models.Client.findAll(queryParams).then((clients) => {
      let response = {
        clients: JSON.parse(JSON.stringify(clients))
      }

      models.Provider.findAll({order:[['id', 'DESC']]}).then((providers) => {
        response.providers = JSON.parse(JSON.stringify(providers))
        callback(null, response)
      }).catch((err) => {
        callback(err)
      })
    }).catch((err) => {
      callback(err)
    })
  },

  /**
  * Function that gets a specific client data
  * @param id with client identificator to search
  * @param callback(err, client)
  */
  findById: (id, callback) => {
    models.Client.findById(id, {
      include: [{
        model: models.Provider,
        attributes: ['id'],
        through: { attributes: [] }
      }]
    }).then((client) => {
      let response = {
        client: JSON.parse(JSON.stringify(client))
      }

      callback(null, response)
    }).catch((err) => {
      callback(err)
    })
  },

  /**
  * Function that updates a client
  * @param clientData with client identificator to update, and info to set:
  *           name, email or phone.
  * @param callback(err, client)
  */
  update: (clientData, callback) => {
    let update = {}
    if (clientData.name) {
      update.name = clientData.name
    }
    if (clientData.email) {
      update.email = clientData.email
    }
    if (clientData.phone) {
      update.phone = clientData.phone
    }

    // Verify if the client exists
    models.Client.findById(clientData.id).then((client) => {
      if (client) {
        // Client exists, it can be updated
        models.Client.update(update, {
          where: {
            id: clientData.id
          }
        }).then((updated) => {
          // update providers, if necessary
          if (clientData.providers && clientData.providers.length) {
            // Find providers to assign them to the client
            models.Provider.findAll({
              where: {
                id: { $in: clientData.providers }
              }
            }).then((providers) => {
              client.setProviders(providers).then((resp) => {
                // Saved providers
                callback(null, true)
              })
            }).catch((err) => {
              callback(err)
            })
          } else {
            callback(null, true)
          }
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

  /**
  * Function that deletes a client
  * @param id, client identificator to delete
  * @param callback(err, deleted)
  */
  delete: (id, callback) => {
    // first of all, Check if the client exists
    models.Client.findById(id).then((client) => {
      if (client) {
        // Client exists, it can be removed
        models.Client.destroy({
          where: {
            id: id
          }
        }).then((client) => {
          callback(null, client)
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

module.exports = Client
