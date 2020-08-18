const GetFlightsUseCase = require('../../../app/application/useCases/getFlightsUseCase');
const FlightsService = require('../../../app/infrastructure/flightsService');

jest.mock('../../../app/infrastructure/flightsService');

describe("#getFlightsUseCase", () => {
    test('should return flights', async () => {
        //arrange 
        const flights = [
            {
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
            }
        ];

        FlightsService.getFlights = jest.fn(() => flights);

        //act
        const response = await GetFlightsUseCase({ flightsService: FlightsService})

        //assert
        expect(response).toBe(flights);
    });
});