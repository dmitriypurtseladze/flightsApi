'use strict';

const Slice = require('./sliceModel');
const Flight = require('./flightModel');

const _serializeSingleSlice = (slice) => {

    return new Slice(
        slice.origin_name,
        slice.destination_name,
        slice.departure_date_time_utc,
        slice.arrival_date_time_utc,
        slice.flight_number
    );
};

const _serializeSingleFlight = (flight) => {

    let slices = [];
    flight.slices.forEach(slice => {
        slices.push(_serializeSingleSlice(slice));
    });

    return new Flight(
        slices,
        flight.price
    );
}

module.exports = class {

    serialize(data) {
        if (!data) {
            throw new Error('Data is undefined nor null');
        }

        return _serializeSingleFlight(data);
    }
};