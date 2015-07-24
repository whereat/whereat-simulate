const _ = require('lodash');
const { floor, random } = Math;
const uuid = require('node-uuid');
const latLonVariance = .001;

const parse = {};

parse.variance = latLonVariance;

// (LocationSpecs, Number) -> Array[String]
parse.getUuids = (specs, mult) => _.times(numIds(specs, mult), uuid.v4);

// (LocationSpecs, Array[String], Number) -> Array[LocationInitRequest]
parse.initRequests = (specs, uuids, mult) => (
  _(specs.http)
    .map((spec, i) => (
      multiply(mult, _.partial(initify, specs, spec), uuids, i * mult, spec.locs[0])))
    .flatten()
    .value());

//(LocationSpecs, Array[String], Number) -> Array[Array[LocationRefreshRequest]]
parse.refreshRequests = (specs, uuids, mult) => {
  return _(specs.http)
    .map((spec, i) => (
        _(spec.locs)
        .tail()
        .map(loc => (
          multiply(mult, _.partial(refreshify, specs, spec), uuids, i * mult, loc)))
        .value()))
    .unzip()
    .map(_.flatten)
    .value();
};

// (LocationSpecs) -> Array[String]
parse.ids = (specs) => _.pluck(specs.http, 'id');

// (LocationSpecs, Number) -> Number
const numIds = (specs, mult) => specs.http.length * mult;

// (LocationSpecs, HttpLocationSpec) -> LocationInitRequest
const initify = (specs, spec, resolve, loc) => ({
  id: resolve(spec.id),
  lat: loc.lat,
  lon: loc.lon,
  time: specs.time
});

const refreshify = (specs, spec, resolve, loc) => ({
  lastPing: specs.lastPing,
  location: {
    id: resolve(spec.id),
    lat: loc.lat,
    lon: loc.lon,
    time: specs.time
  }
});

// (Number, (LatLon => LocationRequest), LatLon) -> LocationSpecs
const multiply = (n, requestify, uuids, offset, loc) => {
  return [requestify(_.identity, loc)]
    .concat(
      _.times(n-1, (i) => (
        requestify(_.partial(uuidify, uuids, offset, i), scatter(loc)))));
};

// (Array[String], Number, String) -> String
const uuidify = (uuids, offset, index, id) => uuids[index + offset];

// (LatLon) => LatLon
const scatter = (loc) => ({
  lat: randomize(loc.lat),
  lon: randomize(loc.lon)
});

// (Number) -> Number
const randomize = (n) => {
  const rand = n - (parse.variance / 2) + (random() * parse.variance);
  return _.round(rand, 6);
};

module.exports = parse;
