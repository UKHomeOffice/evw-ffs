'use strict';

/* eslint no-process-env: 0*/

module.exports = {
  flightService: {
    url: process.env.FLIGHT_SERVICE_URL || 'http://localhost:9350',
    timeout: 2000,
    check: {
      method: 'GET',
      endpoint: 'check-flight'
    }
  }
};
