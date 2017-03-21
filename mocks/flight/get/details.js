'use strict';

var tpl = function template (params, query) {
  let departureCountryCode = 'AE';
  let departurePort = 'DXB';
  let departureTime = '14:55';
  let departureTimezone = 'Asia/Dubai';
  let arrivalPort = 'LGW';
  let arrivalTime = '19:45';
  if (query.flightNumber === 'BI0097') {
    arrivalPort = 'LHR';
    arrivalTime = '06:25';
  }
  if (query.flightNumber === 'BA2135') {
    departureCountryCode = 'GBR';
    departurePort = 'LHR';
    departureTime = '15:10';
    departureTimezone = 'Europe/London';
    arrivalPort = 'BHD';
    arrivalTime = '16:30';
  }
  return {
    flightNumber: query.flightNumber,
    departure: {
      country: departureCountryCode,
      port: departurePort,
      timezone: departureTimezone,
      date: query.departureDate,
      time: departureTime
    },
    arrival: {
      country: 'GBR',
      port: arrivalPort,
      timezone: 'Europe/London',
      date: query.departureDate,
      time: arrivalTime
    }
  };
};

var search = {

  path: '/check-flight',

  cache: false,

  status: function status (req, res) {
    // mock fail state
    if (req.query.flightNumber === 'FAIL999') {
      res.status(500).send('Service is down');
    } else {
      res.status(200).json({
        flights: this.template.flights(req.params, req.query)
      });
    }
  },

  template: {
    flights: function flights (params, query) {

      if (!query.flightNumber || !query.departureDate) {
        return [];
      }

      // Fake up a no-flights scenario
      if (query.flightNumber === 'NO001') {
        return [];
      }

      // fake up too many results
      if (query.flightNumber === 'SUM1000') {
        return [
          tpl(params, query),
          tpl(params, query)
        ];
      }

      return [
        tpl(params, query)
      ];

    }
  }
};

module.exports = search;
module.exports.tpl = tpl;
