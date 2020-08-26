# Flights API

# Setup instructions:
 - Add authorization data to Docker file in the following format: "Basic [SECRET VALUE]"
 - Run commands:
   - ```docker build -t dmitriy/comtravo-flights-api .```
   - ```docker run -p 4002:4002 -d dmitriy/comtravo-flights-api```
 - Run the following request: ```curl --location --request GET 'http://localhost:4002/flights'```
 
 # Application description:
  - The solution is using the following layers:
    - API - contains API layer;
    - Application - provides business layer with the main application request handlers ("UseCases");
    - Models - data representation for the API client, and data serializers;
    - Infrastructure - provides all the connections to the external services, such as APIs, message busses, databases and cache services;
    - Tests - contains unit tests that check the individual units of the application.
