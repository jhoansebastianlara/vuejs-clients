const Sequelize = require('sequelize');
const config = require('src/config/config');

// Build sequelize intance
var sequelize = new Sequelize(config.database.url, {
  define: {
    // do not add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    freezeTableName: true
  }
});

// Load Client model
var Client = sequelize.import('clients/index.js');
// Load Provider model
var Provider = sequelize.import('providers/index.js');

var db = {};

db.Client = Client;
db.Provider = Provider;

// Associate models that need it
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
