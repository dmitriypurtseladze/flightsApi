'use strict';

const createServer = require('./app/api/server');

const start = async () => {
    try {
        const server = await createServer();
        await server.start();
        console.log(`Server is running at: ${server.info.uri}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

start();