'use strict';

module.exports = class FlightsService {

    constructor(httpRequestsHandler, routes, flightSerializer) {

        this.httpRequestsHandler = httpRequestsHandler;
        this.routes = routes;
        this.flightSerializer = flightSerializer;
    }

    async getFlights() {

        let promises = [];
        this.routes.forEach(route => {
            let request = this.httpRequestsHandler.createRequest(route);
            let promise = this.httpRequestsHandler.executeRequest(request);
            promises.push(promise);
        });

        let settled = await Promise.allSettled(promises);

        let dictionary = new Map();

        settled
            .filter(data => data.status === 'fulfilled' && data.value)
            .forEach(data => {
                data.value.flights.forEach(flight => {
                    let key = '';
                    flight.slices.forEach(s => {
                        key += s.flight_number + s.departure_date_time_utc + s.arrival_date_time_utc;
                    });

                    if (!dictionary.has(key)) {
                        dictionary.set(key, flight);
                    }
                });

            });

        return Array.from(dictionary.values()).map(this.flightSerializer.serialize);
    }
}