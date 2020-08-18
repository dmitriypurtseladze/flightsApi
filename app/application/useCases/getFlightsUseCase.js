'use strict';

module.exports = async ({flightsService}) => {
    
    let flights = await flightsService.getFlights();
    if (!flights) {
        return [];
    }

    return flights;
}