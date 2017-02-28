const constants = require('src/shared/constants')
const http = require('http')
const express = require('express')
const cors = require('cors')
const api = require('src/api')
const bodyParser = require('body-parser')

// init express to controll routes
const app = express()
// server creation with basic express configurations
const server = http.createServer(app)
// sets port to listen to requests
const port = process.env.PORT || constants.PORT

// API supports cross-domain-requests
app.use(cors())
// middleware for urlencoded parameters parser
app.use(bodyParser.urlencoded({ extended: false }))
// middleware for json parameters parser
app.use(bodyParser.json())
// creates middleware for API endpoints
app.use('/api', api)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
