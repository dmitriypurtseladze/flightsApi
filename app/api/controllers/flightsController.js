'use strict';

const GetFlights = require('../../application/useCases/getFlightsUseCase');

module.exports = {

    getFlights(request) {
        const serviceLocator = request.server.app.serviceLocator;
        return GetFlights(serviceLocator);
    }
}