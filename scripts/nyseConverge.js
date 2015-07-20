const telnetClient = require('telnet-client');
const api = require('../modules/api');
const parse = require('../modules/parse');
const locSpecs = require('../data/nyseConverge.js');

main();

const main = () => {
  const tn = new telnetClient();
  const requests = parse.requests(locSpecs);
  tn.connect({ host: '127.0.0.1', port: 5554 });
  tn.on('ready', (msg) => {
    console.log("Telnet connected: ", msg);
    init(tn, locSpecs);
    refresh(tn, locSpecs);
    tn.close();
  });
};

// (TelnetClient, Array[LocationSpec]) -> ()
const init = (tn, lSpecs) => {
  const reqs = parse.initRequests(lSpecs);
  api.init(reqs)
    .then(res => {
      console.log("Received API response: ", res);
      tn.exec(lSpecs.telnet[0], console.log);
    })
    .catch(err => console.error(err));
};

const refresh = (tn, lSpecs) => {
  const reqGroups = parse.refreshRequests(lSpecs);
  reqGroups.map((reqs, i) => {
    api.refresh(reqs)
      .then(res => {
        console.log("Received API response: ", res);
        tn.exec(lSpecs.telnet[i], console.log);
      })
      .catch(err => console.error(err));
  });
};
