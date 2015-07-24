const telnet = require('./modules/telnet');
const api = require('./modules/api');
const parse = require('./modules/parse');
const { wait } = require('./modules/async');
const _ = require('lodash');

const reqInterval = 4.5;
const tnInterval = .5;


// (String, Number) => Unit
const main = (specPath, mult) => {

  const tn = telnet.getInstance();
  const specs = require(`./data/${specPath}`);
  const uuids = parse.getUuids(specs, mult);

  telnet.connect(tn)
    .then(res => api.erase())
    .then(res => init(tn, specs, uuids, mult))
    .then(res => refresh(tn, specs, uuids, mult))
    .then(res => telnet.close(tn))
    .then(res => process.exit())
    .catch(err => {
      console.error(JSON.stringify(err, null, 2));
      process.exit();
    });

};

// (TelnetClient, Number, LocationSpecs) -> Promise[Unit]
const init = (tn, specs, uuids, mult) => {
  const reqs = parse.initRequests(specs, uuids, mult);
  return api.init(reqs)
    .then(res => console.log("Received API responses to `locations/init`: \n", res))
    .then(res => wait(tnInterval))
    .then(res => {
      console.log(`Sending telnet cmd: ${specs.telnet[0]}`);
      tn.exec(specs.telnet[0], console.log);
    });
};

// (TelnetClient, Number, LocationSpec) -> Promise[Unit]
const refresh = (tn, specs, uuids, mult) => {
  const reqGroups = parse.refreshRequests(specs, uuids, mult);
  return reqGroups.reduce(
    (promiseSeq, reqs, i) => promiseSeq
      .then(res => wait(reqInterval))
      .then(res => refreshOne(reqs, tn, specs.telnet[i + 1]))
    , Promise.resolve()
  );
};

// (LocationSpec) -> Promise[Unit]
const remove = (specs) => (
  api.remove(parse.ids(specs))
    .then(res => console.log("Received API response to removal requests: \n", res))
);

// (Array[LocationRefreshRequest], TelnetConnection, String) -> Promise[Unit]
const refreshOne = (reqs, tn, cmd) =>
  api.refresh(reqs)
    .then(res => console.log("Received API responses to `locations/refresh`: \n", res))
    .then(res => wait(tnInterval))
    .then(res => {
      console.log(`Sending telnet cmd: ${cmd}`);
      tn.exec(cmd, console.log);
    });

main(process.argv[2], process.argv[3]);
