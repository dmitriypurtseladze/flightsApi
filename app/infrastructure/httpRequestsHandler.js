'use strict';

const superagent = require('superagent');
const { Policy } = require('cockatiel');

module.exports = class httpRequestsHandler {

    constructor(retryPolicy, breakerPolicy, timeoutPolicy) {

        this.retry = retryPolicy;

        this.breaker = breakerPolicy;

        this.timeout = timeoutPolicy;
    }

    createRequest(route) {
        let authorization = process.env.discovery_stub_comtravo_authorization;
        
        if (!authorization) {
            throw new Error('Please provide authorization');
        }

        return new Promise((resolve, reject) => {

            superagent
                .get(route)
                .set('Authorization', authorization)
                .then(response => {
                    resolve(response.body);
                })
                .catch(error => {
                    console.log(error);
                    return reject(new Error(err));
                });
        });
    }

    executeRequest(request) {
        return new Promise(async (resolve, reject) => {
            try {
                await Policy.wrap(this.timeout, this.retry, this.breaker).execute(async context => {
                    resolve(await request);
                });
            } catch (error) {
                console.log(error);
                return reject(new Error());
            }
        });
    }
}
