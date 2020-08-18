'use strict';
const Boom = require('@hapi/boom');

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

        let results = await Promise.allSettled(promises)
            .then((responses) => {
                return Promise.all(responses.map((response) => {
                    return response;
                }))
            }).then((dataArray) => {

                let dictionary = new Map();

                dataArray.forEach(data => {
                    if (data.status === 'fulfilled') {
                        if (data.value) {
                            data.value.flights.forEach(flight => {
                                let key = '';
                                flight.slices.forEach(s => {
                                    key += s.flight_number + s.departure_date_time_utc + s.arrival_date_time_utc;
                                });

                                if (!dictionary.has(key)) {
                                    dictionary.set(key, flight);
                                }
                            });
                        }
                    }
                });

                let arr = [];

                dictionary.forEach((value, key) => {
                    arr.push(this.flightSerializer.serialize(value));
                });

                return arr;

            }).catch((err) => {
                console.log(err);
                return Boom.serverUnavailable('unavailable');
            });

        return results;
    }
}