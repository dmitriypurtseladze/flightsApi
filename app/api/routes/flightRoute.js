'use strict';
const FlightsController = require('../controllers/flightsController');

module.exports = {
    name: "flights",
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'GET',
                path: '/flights',
                handler: FlightsController.getFlights,
                options: {
                    description: 'Returns flights',
                    tags: ['api']
                }
            }
        ]);
    }
}