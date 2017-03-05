# Practical test for fullstack developer - Backend

Backend used for full-stack JS developer test.


## Prerequisites
- Be sure that you have installed [Node JS 6.10](https://nodejs.org/en/download/) and npm.
- Be sure that you have installed [mysql 5.6.31](https://dev.mysql.com/downloads/file/?id=463209) or later and running.


## Getting stared
- Execute the base [.sql file](https://github.com/jhoansebastianlara/vuejs-clients/blob/master/backend/sql/clientsDB.sql) in your system: It will generate a DB called 'DB_CLIENTS' with the basic (necessary) structure.

- Configure your **database connection** => `database.url` and **API port** => `port`: to do that you need to open `/src/config/config.js` and set your own configuration.
  ```
  database: {
    // mysql://[USER]:[PASSWORD]@[DOMAIN]:[PORT]/[DB_NAME]
    url: "[YOUR_MYSQL_CONNECTION_HERE]"
  },
  // Indicates the port on which the api runs
  port: 3000
  ```


## Install
Be sure that you are in `/backend` folder.

``` bash
# install dependencies
npm install
```

## Start server
``` bash
# run server
npm run serve
```

## Tech
- [Node JS](https://nodejs.org)
- [Express JS](https://expressjs.com/)
- [Sequalize](http://sequelize.readthedocs.io/en/latest/)

## License
MIT
