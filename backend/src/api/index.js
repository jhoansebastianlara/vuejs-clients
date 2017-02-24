const express = require('express');
const Client = require('src/lib/clients');
const Provider = require('src/lib/providers');
const constants = require('src/shared/constants');

// creates new router for store routes
const router = express.Router()

router.get('/clients', (req, res) => {
  let query = req.query;

  // Validate that sortType is an accepted value
  if (query.sortType) {
    query.sortType = (query.sortType == 'ASC' || query.sortType == 'DESC') ? query.sortType : '';
  }

  Client.find(query, (err, client) => {
    if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

    res.json(client);
  });
});


router.post('/clients', (req, res) => {
  let body = req.body;

  let clientData = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    providers: body.providers ? (body.providers.length ? body.providers : [body.providers]) : []
  };

  // Validate fields required
  let allFieldsOK = clientData.name && clientData.email && clientData.phone;

  if (allFieldsOK) {
    Client.create(clientData, (err, client) => {
      if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

      res.json(client);
    });
  } else {
    res.json({
      code: constants.HTTP_STATUS.BAD_REQUEST,
      desc: 'Missing fields or wrong inputs'
    });
  }
});

router.put('/clients/:id', (req, res) => {
  let body = req.body;

  let clientData = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    id: req.params.id
  };

  // Validate fields required
  let allFieldsOK = clientData.name || clientData.email || clientData.phone;

  if (allFieldsOK) {
    Client.update(clientData, (err, updated) => {
      if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

      res.json(updated);
    });
  } else if (body.providers) {
    // Update providers related with client
    clientData.providers = body.providers.length ? body.providers : [body.providers];
    Client.updateProviders(clientData, (err, updated) => {
      if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

      res.json(updated);
    });
  } else {
    res.json({
      code: constants.HTTP_STATUS.BAD_REQUEST,
      desc: 'Missing fields or wrong inputs'
    });
  }
});

router.delete('/clients/:id', (req, res) => {
  Client.delete(req.params.id, (err, deleted) => {
    if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

    res.json(deleted);
  });
});

router.get('/clients/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

    res.json(client);
  });
});

router.post('/providers', (req, res) => {
  let body = req.body;

  let providerData = {
    name: body.name
  };

  // Validate fields required
  if (providerData.name) {
    Provider.create(providerData, (err, provider) => {
      if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

      res.json(provider);
    });
  } else {
    res.json({
      code: constants.HTTP_STATUS.BAD_REQUEST,
      desc: 'Missing fields or wrong inputs'
    });
  }
});

router.put('/providers/:id', (req, res) => {
  let body = req.body;

  let providerData = {
    name: body.name,
    id: req.params.id
  }

  // Validate fields required
  if (providerData.name) {
    Provider.update(providerData, (err, updated) => {
      if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

      res.json(updated);
    });
  } else {
    res.json({
      code: constants.HTTP_STATUS.BAD_REQUEST,
      desc: 'Missing fields or wrong inputs'
    });
  }
});

router.delete('/providers/:id', (req, res) => {
  Provider.delete(req.params.id, (err, deleted) => {
    if (err) return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);

    res.json(deleted);
  });
});

module.exports = router;
