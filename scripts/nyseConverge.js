const telnetClient = require('telnet-client');
const api = require('../modules/api');
const parse = require('../modules/parse');
const locSpecs = require('../data/nyseConverge.js');

const interval = 3;

const main = () => {
  console.log('running!');
  const tn = new telnetClient();
  tn.connect({
    host: '127.0.0.1',
    port: 5554,
    shellPrompt: '',
    timeout: 1500
  });
  console.log("Telnet connected?");
  api.erase()
    .then(res => init(tn, locSpecs))
    .then(res => refresh(tn, locSpecs))
    .then(res => api.erase())
    .then(res => close(tn))
    .then(res => process.exit());
};

// (TelnetClient, LocationSpec) -> Promise[Unit]
const init = (tn, lSpecs) => {
  const reqs = parse.initRequests(lSpecs);
  return api.init(reqs)
    .then(
      res => {
        console.log("Received API responses to `locations/init`: \n", res);
        console.log(`Sending telnet cmd: ${lSpecs.telnet[0]}`);
        tn.exec(lSpecs.telnet[0], console.log);
      },
      err => console.error(err));
};

// (TelnetClient, LocationSpec) -> Promise[Unit]
const refresh = (tn, lSpecs) => {
  const reqGroups = parse.refreshRequests(lSpecs);
  return reqGroups.reduce(
    (promiseSeq, reqs, i) => promiseSeq
      .then(res => wait(interval))
      .then(res => refreshOne(reqs, tn, lSpecs.telnet[i]))
    , Promise.resolve()
  );
};

// (Array[LocationRefreshRequest], TelnetConnection, String) -> Promise[Unit]
const refreshOne = (reqs, tn, cmd) => {
  return api.refresh(reqs)
    .then(
      res => {
        console.log("Received API responses to `locations/refresh`: \n", res);
        console.log(`Sending telnet cmd: ${cmd}`);
        tn.exec(cmd, console.log);
      },
      err  => console.error(err));
};


const close = (telnet) => {
  return new Promise((resolve) => {
    telnet.end();
    console.log("Closed telnet connection");
    resolve();
  });
};

const wait = (secs) => {
  console.log(`Waiting ${secs} secs...`);
  return new Promise((resolve) => setTimeout(resolve, secs*1000));
};


main();
