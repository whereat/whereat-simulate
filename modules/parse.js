const _ = require('lodash');
const parse = {};

// (LocationSpecs) -> Array[LocationInitPojo]
parse.initRequests = (specs) => (
  specs.http.map(
    spec => ({
      id: spec.id,
      lat: spec.locs[0].lat,
      lon: spec.locs[0].lon,
      time: specs.time
    })));

//(LocationSpecs) -> Array[Array[LocationRefreshPojo]]
parse.refreshRequests = (specs) => (
  _(specs.http)
    .map(hSpec => (
      _(hSpec.locs)
        .tail()
        .map(loc => ({
          lastPing: specs.lastPing,
          location: {
            id: hSpec.id,
            lat: loc.lat,
            lon: loc.lon,
            time: specs.time
          }
       }))
       .value()
    ))
    .unzip()
    .value());

// (LocationSpecs) -> Array[String]
parse.ids = (specs) => _.pluck(specs.http, 'id');

module.exports = parse;
