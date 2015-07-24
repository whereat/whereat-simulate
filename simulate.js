const telnet = require('./modules/telnet');
const api = require('./modules/api');
const parse = require('./modules/parse');
const { wait } = require('./modules/async');

const reqInterval = 4.5;
const tnInterval = .5;


// (String) => Unit
const main = (specPath) => {

  const locSpecs = require(`./data/${specPath}`);
  const tn = telnet.getInstance();

  telnet.connect(tn)
    .then(res => api.erase())
    .then(res => init(tn, locSpecs))
    .then(res => refresh(tn, locSpecs))
    .then(res => telnet.close(tn))
    .then(res => process.exit());

};

// (TelnetClient, LocationSpec) -> Promise[Unit]
const init = (tn, lSpecs) => {
  const reqs = parse.initRequests(lSpecs);
  return api.init(reqs)
    .then(res => console.log("Received API responses to `locations/init`: \n", res))
    .then(res => wait(tnInterval))
    .then(res => {
      console.log(`Sending telnet cmd: ${lSpecs.telnet[0]}`);
      tn.exec(lSpecs.telnet[0], console.log);
    });
};

// (TelnetClient, LocationSpec) -> Promise[Unit]
const refresh = (tn, lSpecs) => {
  const reqGroups = parse.refreshRequests(lSpecs);
  return reqGroups.reduce(
    (promiseSeq, reqs, i) => promiseSeq
      .then(res => wait(reqInterval))
      .then(res => refreshOne(reqs, tn, lSpecs.telnet[i + 1]))
    , Promise.resolve()
  );
};

// (LocationSpec) -> Promise[Unit]
const remove = (lSpecs) => (
  api.remove(parse.ids(lSpecs))
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

main(process.argv[2]);
