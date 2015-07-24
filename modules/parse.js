const _ = require('lodash');
const { floor, random } = Math;
const latLonVariance = .001;

const parse = {};

// (LocationSpecs) -> Array[LocationInitRequest]
parse.initRequests = (n, specs) => (
  _(specs.http)
    .map(
      spec =>
        multiply(n, _.partial(initify, specs, spec), spec.locs[0]))
    .flatten()
    .value());

//(LocationSpecs) -> Array[Array[LocationRefreshRequest]]
parse.refreshRequests = (n, specs) =>
  _(specs.http)
  .map(
    spec =>
      _(spec.locs)
      .tail()
      .map(loc => multiply(n, _.partial(refreshify, specs, spec), loc))
      .flatten()
      .value())
  .unzip()
  .value();

// (LocationSpecs) -> Array[String]
parse.ids = (specs) => _.pluck(specs.http, 'id');

// (LocationSpecs, HttpLocationSpec) -> LocationInitRequest
const initify = (specs, spec, loc) => ({
  id: spec.id,
  lat: loc.lat,
  lon: loc.lon,
  time: specs.time
});

const refreshify = (specs, spec, loc) => ({
  lastPing: specs.lastPing,
  location: {
    id: spec.id,
    lat: loc.lat,
    lon: loc.lon,
    time: specs.time
  }
});

// (Number, (LatLon => LocationRequest), LatLon) -> LocationSpecs
const multiply = (n, requestify, loc) => (
  _([requestify(loc)])
    .concat(_.times(n - 1, requestify(scatter(loc))))
    .value()
);

// (LatLon) => LatLon
const scatter = (loc) => ({
  lat: randomize(loc.lat),
  lon: randomize(loc.lon)
});

// (Number) -> Number
const randomize = (n) => floor(random() * latLonVariance);

module.exports = parse;
