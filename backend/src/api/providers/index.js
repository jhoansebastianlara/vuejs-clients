const express = require('express')
const constants = require('src/shared/constants')
const Client = require('src/lib/clients')
const Provider = require('src/lib/providers')

// creates new router for /providers routes
const router = express.Router()

/**
* Save a provider
*/
router.post('/', (req, res) => {
  let body = req.body

  let providerData = {
    name: body.name
  }

  // Validate fields required
  if (providerData.name) {
    Provider.create(providerData, (err, provider) => {
      if (err) {
        return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
          error: constants.ERROR_CODES.INTERNAL_ERROR
        })
      }

      res.status(constants.HTTP_STATUS.CREATED).json(provider)
    })
  } else {
    res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
      error: constants.ERROR_CODES.MISSING_FIELDS
    })
  }
})

/**
* Update the info for a provider
*/
router.put('/:id', (req, res) => {
  let body = req.body

  let providerData = {
    name: body.name,
    id: req.params.id
  }

  // Validate fields required
  if (providerData.name && providerData.id) {
    Provider.update(providerData, (err, data) => {
      if (err) {
        console.log('error update: ')
        console.log(err)
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
  } else {
    res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
      error: constants.ERROR_CODES.MISSING_FIELDS
    })
  }
})

/**
* Delete a provider
*/
router.delete('/:id', (req, res) => {
  Provider.delete(req.params.id, (err, data) => {
    console.log(err)
    console.log(data)
    if (err) {
      return res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
        error: constants.ERROR_CODES.INTERNAL_ERROR
      })
    }

    if (data.notFound) {
      return res.status(constants.HTTP_STATUS.NOT_FOUND).json({
        error: constants.ERROR_CODES.NOT_FOUND
      })
    }

    res.json(data)
  })
})

module.exports = router
