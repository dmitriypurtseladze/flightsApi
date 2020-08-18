const HttpRequestHandler = require('../../app/infrastructure/httpRequestsHandler');
const FlightsService = require('../../app/infrastructure/flightsService');
const FlightsSerializer = require('../../app/models/flightSerializer');

jest.mock('../../app/infrastructure/httpRequestsHandler');
jest.mock('../../app/models/flightSerializer');

describe('#flightsService', () => {

    test('should return unique flights', async () => {

        //arrange
        const flight1 = {
            "slices": [
                {
                    "origin_name": "Schonefeld",
                    "destination_name": "Stansted",
                    "departure_date_time_utc": "2019-08-08T04:30:00.000Z",
                    "arrival_date_time_utc": "2019-08-08T06:25:00.000Z",
                    "flight_number": "144",
                    "duration": 115
                },
                {
                    "origin_name": "Stansted",
                    "destination_name": "Schonefeld",
                    "departure_date_time_utc": "2019-08-10T05:35:00.000Z",
                    "arrival_date_time_utc": "2019-08-10T07:35:00.000Z",
                    "flight_number": "8542",
                    "duration": 120
                }
            ],
            "price": 129
        };
        const flightsObject = {
            "flights": [
                flight1,
                flight1
            ]
        };

        HttpRequestHandler.createRequest = jest.fn(() => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    resolve(flightsObject);
                });
            });
        });

        HttpRequestHandler.executeRequest = jest.fn(async (request) => {
            return new Promise(async (resolve, reject) => {
                process.nextTick(async () => {
                    resolve(await request);
                });
            });
        });

        FlightsSerializer.serialize = jest.fn(() => {
            return {
                "slices": [
                    {
                        "originName": "Schonefeld",
                        "destinationName": "Stansted",
                        "departureDateTimeUtc": "2019-08-08T04:30:00.000Z",
                        "arrivalDateTimeUtc": "2019-08-08T06:25:00.000Z",
                        "flightNumber": "144",
                        "duration": 115
                    },
                    {
                        "originName": "Stansted",
                        "destinationName": "Schonefeld",
                        "departureDateTimeUtc": "2019-08-10T05:35:00.000Z",
                        "arrivalDateTimeUtc": "2019-08-10T07:35:00.000Z",
                        "flightNumber": "8542",
                        "duration": 120
                    }
                ],
                "price": 129
            };
        });
        
        const route = 'https://discovery-stub.comtravo.com/source1';
        let flightsServise = new FlightsService(HttpRequestHandler, [route], FlightsSerializer);

        //act
        const response = await flightsServise.getFlights();

        //assert
        expect(response.length === 1).toBeTruthy();
        expect(response[0].slices[0].flightNumber === "144").toBeTruthy();
        expect(response[0].slices[0].departureDateTimeUtc === "2019-08-08T04:30:00.000Z").toBeTruthy();
        expect(response[0].slices[0].arrivalDateTimeUtc === "2019-08-08T06:25:00.000Z").toBeTruthy();
        expect(HttpRequestHandler.createRequest).toHaveBeenCalledTimes(1);
        expect(HttpRequestHandler.executeRequest).toHaveBeenCalledTimes(1);
    });

    test('should return empty array', async () => {

        //arrange

        HttpRequestHandler.createRequest = jest.fn(() => {
            return new Promise((resolve, reject) => {

                process.nextTick(() =>
                    resolve({})
                );

            });
        });

        HttpRequestHandler.executeRequest = jest.fn((request) => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    return reject(new Error());
                });

            });

        });

        FlightsSerializer.serialize = jest.fn(() => {
            return {};
        });

        const route = 'https://discovery-stub.comtravo.com/source1';
        let flightsServise = new FlightsService(HttpRequestHandler, [route], FlightsSerializer);

        //act
        const response = await flightsServise.getFlights();

        //assert
        expect(response.length === 0).toBeTruthy();
    });


})

