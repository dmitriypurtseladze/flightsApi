'use strict';

const { TimeoutStrategy, Policy, ConsecutiveBreaker } = require('cockatiel');
const config = require('../../api/config/config');
const FlightsService = require('../../infrastructure/flightsService');
const HttpRequestHandler = require('../httpRequestsHandler');
const FlightSerializer = require('../../models/flightSerializer')

const buildServices = () => {

    let services = {};

    services.flightsService = buildFlightsService();

    services.config = config;

    return services;
}

const buildFlightsService = () => {

    const config = gConfig.discovery_stub_comtravo;

    //retry x times, increasing delays between them
    const retryPolicy = Policy.handleAll().retry().attempts().delay(config.retryPolicy.delays);

    //circuitBreaker will stop calling the executed function for x milliseconds if it fails y times in a row.
    const breakerPolicy = Policy.handleAll().circuitBreaker(
        config.circuitBreakerPolicy.halfOpenAfterMs,
        new ConsecutiveBreaker(config.circuitBreakerPolicy.threshold));

    //cancels the execution of a request after x milliseconds
    const timeoutPolicy = Policy.timeout(config.timeoutPolicy.durationInMs, TimeoutStrategy.Aggressive);

    const handler = new HttpRequestHandler(retryPolicy, breakerPolicy, timeoutPolicy);
    const routes = config.routes;
    const flightSerializer = new FlightSerializer();
    return new FlightsService(handler, routes, flightSerializer);
}


module.exports = buildServices();