'use strict';

module.exports = class {
    constructor(origin_name, destination_name, departure_date_time_utc, arrival_date_time_utc, flight_number, duration) {
        this.originName = origin_name;
        this.destinationName = destination_name;
        this.departureDateTimeUtc = departure_date_time_utc;
        this.arrivalDateTimeUtc = arrival_date_time_utc;
        this.flightNumber = flight_number;
        this.duration = duration;
    }
}