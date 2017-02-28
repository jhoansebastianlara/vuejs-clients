const express = require('express')
const constants = require('src/shared/constants')
const clients = require('src/api/clients')
const providers = require('src/api/providers')

// creates new router for /api routes
const router = express.Router()

router.use('/clients', clients)
router.use('/providers', providers)

module.exports = router
