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
