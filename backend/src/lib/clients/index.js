const models = require('src/models');
const constants = require('src/shared/constants');

module.exports = {

  /**
  * Function that creates a client
  * @param clientData with name, email and phone of client. Optional array of
  *                 providers ids to assign.
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
            callback(null, client);
          });
        });
      } else {
        callback(null, client);
      }
    }).catch((err) => {
      callback(err);
    });
  },

  /**
  * Function for searching clients list. Filtered by given data on query object,
  * and sorting using sortField and sortType ('ASC', 'DESC').
  * @param query
  * @param callback(err, clients)
  */
  find: (query, callback) => {
    if (!query) {
      callback = query
      query = {}
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
      // Default sort to id and ASC
      order: [[query.sortField ? query.sortField : 'id', query.sortType == 'DESC' ? query.sortType : 'ASC']]
    };

    if (query.id) {
      queryParams.where.id = query.id
    }
    // If name in query, use like for filtering
    if (query.name) {
      queryParams.where.name = {
        $like: '%' + query.name + '%'
      };
    }
    // If email in query, use like for filtering
    if (query.email) {
      queryParams.where.email = {
        $like: '%' + query.email + '%'
      };
    }
    // If phone in query, use like for filtering
    if (query.phone) {
      queryParams.where.phone = {
        $like: '%' + query.phone + '%'
      };
    }

    models.Client.findAll(queryParams).then((clients) => {
      let response = {
        clients: JSON.parse(JSON.stringify(clients))
      };

      models.Provider.findAll().then((providers) => {
        response.providers = JSON.parse(JSON.stringify(providers));
        callback(null, response);
      }).catch((err) => {
        console.log(err);
        callback(err);
      })
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
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
      };

      callback(null, response);
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
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

    // Send to update info in database
    models.Client.update(update, {
      where: {
        id: clientData.id
      }
    }).then((updated) => {
      callback(null, updated);
    }).catch((err) => {
      callback(err);
    });
  },

  /**
  * Function that updates providers for a client
  * @param clientData with client identificator to update, and info to set:
  *           provider ids array (providers).
  * @param callback(err, client)
  */
  updateProviders: (clientData, callback) => {
    // Find client for updating
    models.Client.findById(clientData.id).then((client) => {
      // Send to update info in database
      if (client) {
        // Find providers to assign on client
        models.Provider.findAll({
          where: {
            id: { $in: clientData.providers }
          }
        }).then((providers) => {
          client.setProviders(providers).then(() => {
            // Saved providers
            callback(null, [1]);
          });
        });
      } else {
        callback(null, {
          code: constants.HTTP_STATUS.NOT_FOUND,
          desc: 'Client not found'
        });
      }
    }).catch((err) => {
      callback(err);
    });
  },

  /**
  * Function that deletes a client
  * @param id, client identificator to delete
  * @param callback(err, deleted)
  */
  delete: (id, callback) => {
    models.Client.destroy({
      where: {
        id: id
      }
    }).then((client) => {
      callback(null, client);
    }).catch((err) => {
      callback(err);
    });
  }
};
