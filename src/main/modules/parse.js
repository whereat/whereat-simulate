/**
 *
 * Copyright (c) 2015-present, Total Location Test Paragraph.
 * All rights reserved.
 *
 * This file is part of Where@. Where@ is free software:
 * you can redistribute it and/or modify it under the terms of
 * the GNU General Public License (GPL), either version 3
 * of the License, or (at your option) any later version.
 *
 * Where@ is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For more details,
 * see the full license at <http://www.gnu.org/licenses/gpl-3.0.en.html>
 *
 */

const _ = require('lodash');
const { floor, random } = Math;
const uuid = require('node-uuid');
const latLonVariance = .00075;

const parse = {};

parse.variance = latLonVariance;

// (LocationSpecs, Number) -> Array[String]
parse.getUuids = (specs, mult) => _.times(numIds(specs, mult), uuid.v4);

// (LocationSpecs, Array[String], Number) -> Array[Array[LocationRefreshRequest]]
parse.updateRequests = (specs, uuids, mult) => {
  return _(specs.http)
    .map((spec, i) => (
      spec.locs.map(loc => multiply(
        mult,
        _.partial(requestify, specs, spec),
        uuids,
        i * mult,
        loc))))
    .unzip()
    .map(_.flatten)
    .value();
};

// (LocationSpecs) -> Array[String]
parse.ids = (specs) => _.pluck(specs.http, 'id');

// (LocationSpecs, Number) -> Number
const numIds = (specs, mult) => specs.http.length * mult;

// (LocSpecs, LocSpec, (LocSpec => LocSpec), Location) -> UpdateRequest
const requestify = (specs, spec, resolve, loc) => ({
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
  const rand = (n - (parse.variance / 2)) + (random() * parse.variance);
  return _.round(rand, 6);
};

module.exports = parse;
