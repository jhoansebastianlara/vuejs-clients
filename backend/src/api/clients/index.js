const express = require('express')
const constants = require('src/shared/constants')
const Client = require('src/lib/clients')

// creates new router for /clients routes
const router = express.Router()

/**
* returns information about the stored clients and their relationships with providers
*/
router.get('/', (req, res) => {
  let query = req.query

  // Validate that sortType is an accepted value
  if (query.sortType) {
    query.sortType = (query.sortType == 'ASC' || query.sortType == 'DESC') ? query.sortType : ''
  }

  Client.find(query, (err, client) => {
    if (err) {
      return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
        error: constants.ERROR_CODES.INTERNAL_ERROR
      })
    }
    // ok
    res.json(client)
  })
})

/**
* Save a client
*/
router.post('/', (req, res) => {
  let body = req.body
  let providers = body['providers[]']
  console.log(body)
  let clientData = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    providers: providers && Array.isArray(providers) ? providers : [providers],
  }
  console.log('clientData:')
  console.log(clientData)

  // Validate fields required
  let allFieldsOK = clientData.name && clientData.email && clientData.phone

  if (allFieldsOK) {
    Client.create(clientData, (err, client) => {
      if (err) {
        return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
          error: constants.ERROR_CODES.INTERNAL_ERROR
        })
      }

      res.status(constants.HTTP_STATUS.CREATED).json(client)
    })
  } else {
    res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
      error: constants.ERROR_CODES.MISSING_FIELDS
    })
  }
})

/**
* Update info for a client
*/
router.put('/:id', (req, res) => {
  let body = req.body
  let providers = body['providers[]']

  let clientData = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    providers: providers && Array.isArray(providers) ? providers : [providers],
    id: req.params.id
  }

  // Validate fields required
  let allFieldsOK = clientData.id && (clientData.name || clientData.email || clientData.phone)

  if (allFieldsOK) {
    Client.update(clientData, (err, data) => {
      if (err) {
        return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
          error: constants.ERROR_CODES.INTERNAL_ERROR
        })
      }

      // check if the client was found
      if (data.notFound) {
        return res.status(constants.HTTP_STATUS.NOT_FOUND).json({
          error: constants.ERROR_CODES.NOT_FOUND
        })
      }

      res.json(data)
    })
  } else if (body.providers) {
    // Update providers related with client
    clientData.providers = body.providers.length ? body.providers : [body.providers]
    Client.updateProviders(clientData, (err, updated) => {
      if (err) {
        return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
          error: constants.ERROR_CODES.INTERNAL_ERROR
        })
      }

      res.json(updated)
    })
  } else {
    res.json({
      error: constants.ERROR_CODES.MISSING_FIELDS
    })
  }
})

/**
* Delete a client
*/
router.delete('/:id', (req, res) => {
  Client.delete(req.params.id, (err, data) => {
    // if (err) return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json(err)
    if (err) {
      return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
        error: constants.ERROR_CODES.INTERNAL_ERROR
      })
    }

    // check if the client was found
    if (data.notFound) {
      return res.status(constants.HTTP_STATUS.NOT_FOUND).json({
        error: constants.ERROR_CODES.NOT_FOUND
      })
    }

    res.json(data)
  })
})

/**
* Get a specific client
*/
router.get('/:id', (req, res) => {
  Client.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
        error: constants.ERROR_CODES.INTERNAL_ERROR
      })
    }

    if (!data.client) {
      return res.status(constants.HTTP_STATUS.NOT_FOUND).json({
        error: constants.ERROR_CODES.NOT_FOUND
      })
    }

    res.json(data)
  })
})

module.exports = router
