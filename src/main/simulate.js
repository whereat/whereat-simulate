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

const telnet = require('./modules/telnet');
const api = require('./modules/api');
const parse = require('./modules/parse');
const { wait } = require('./modules/async');
const _ = require('lodash');

const reqInterval = 4.5;
const tnInterval = .5;

/**
 * usage:
 * $ cd path/to/main/src/
 * $ babel-node simulate nyseConverge 3
 * $ babel-node simulate nyseConverge 50
 */


// (String, Number) => Unit
const main = (specPath, mult) => {

  const tn = telnet.getInstance();
  const specs = require(`./data/${specPath}`);
  const uids = parse.getUuids(specs, mult);

  telnet.connect(tn)
    .then(() => api.erase())
    .then(res => console.log(res.body.msg))
    .then(() => updateMany(tn, specs, uids, mult))
    .then(() => telnet.close(tn))
    .then(() => process.exit())
    .catch(err => {
      console.error(JSON.stringify(err, null, 2));
      process.exit();
    });
};

// (TelnetClient, Number, LocationSpec) -> Promise[Unit]
const updateMany = (tn, specs, uids, mult) => {
  const reqLists = parse.updateRequests(specs, uids, mult);
  return reqLists.reduce(
    (promiseSeq, reqs, i) => promiseSeq
      .then(() => wait(reqInterval))
      .then(() => updateOne(reqs, tn, specs.telnet[i + 1]))
      , Promise.resolve());
};

// (Array[LocationRefreshRequest], TelnetConnection, String) -> Promise[Unit]
const updateOne = (reqs, tn, cmd) =>(
  api.update(reqs)
    .then(res => console.log("Received API responses to `locations/refresh`: \n", res))
    .then(() => wait(tnInterval))
    .then(() => {
      console.log(`Sending telnet cmd: ${cmd}`);
      tn.exec(cmd, console.log);
    }));

// (LocationSpec) -> Promise[Unit]
const remove = (specs) => (
  api.remove(parse.ids(specs))
    .then(res => console.log("Received API response to removal requests: \n", res))
);

main(process.argv[2], process.argv[3]);
