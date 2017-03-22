# EVW flight forecast service integration

![evw-ffs](https://travis-ci.org/UKHomeOffice/evw-ffs.svg?branch=master) [![npm](https://img.shields.io/npm/v/evw-ffs.svg)]()

## Run

To spin up a stub version of the evw flight forecast service:

```
  node ./node_modules/.bin/evw-ffs
```

## Query

To query either the stub or the real service:

```
const flightLookup = require('evw-ffs').flightLookup;

flightLookup
  .findFlight('ku101', '2017-06-09')
  .then(data => {
   // do what you want with flight data
  }).catch(error => {
    console.error('oh noes', error);
  });
```
