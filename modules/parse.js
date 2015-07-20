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

// (LocationSpecs) -> Array[Array[LocationRefreshPojo]]
parse.refreshRequests = (specs) => (
  specs.http.map(
    spec => tail(spec.locs).map(
      loc => ({
        lastPing: specs.lastPing,
        location: {
          id: spec.id,
          lat: loc.lat,
          lon: loc.lon,
          time: specs.time
        }
      }))));

const tail = (arr) => arr.splice(1, arr.size);

module.exports = parse;
