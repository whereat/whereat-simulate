const TelnetClient = require('telnet-client');

const telnet = {};

// () -> TelnetClient
telnet.getInstance = () => new TelnetClient();

// (TelnetClient) -> Promise[Unit]
telnet.connect = (tn) => {
  tn.connect({
    host: '127.0.0.1',
    port: 5554,
    shellPrompt: '',
    timeout: 1500
  });
  return new Promise(
    (resolve) => {
      tn.on('connect', () => {
        console.log("Telnet connected.");
        resolve();
      });
    });
};

// (TelnetClient) -> Promise[Unit]
telnet.close = (tn) => {
  return new Promise((resolve) => {
    tn.end();
    console.log("Closed telnet connection");
    resolve();
  });
};


module.exports = telnet;
