const Hapi = require('hapi');

const createServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 4003,
        host: process.env.HOST || 'localhost'
      });

      await server.register([
            require('./routes/flightRoute')
      ]);

      server.app.serviceLocator = require('../infrastructure/config/service-locator');

      return server;

};

module.exports = createServer;

