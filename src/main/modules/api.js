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

const http = require('superagent');

const api = {};

api.url = process.NODE_ENV === 'dev' ?
  "https://dev-api.whereat.io" :
  "https://api.whereat.io";

// (Array[LocationUpdatePojo]) -> Promise[Array[LocationResponse]]
api.update = (reqs) => Promise.all(reqs.map(req => api.post('update', req)));

// (Array[String]) -> Promise[Array[String]]
api.remove = (ids) => Promise.all(ids.map(id => api.post('remove', id)));

// () -> Promise[String]
api.erase = () => (
  new Promise(
    (resolve, reject) => http
      .post(`${api.url}/locations/erase`)
      .end((err, res) => err ? reject(err) : resolve(res))));

//(String, LocationPojo) => Promise[LocationResponse]
api.post = (endpoint, req) => (
  new Promise(
    (resolve, reject) => http
      .post(`${api.url}/locations/${endpoint}`)
      .send(req)
      .end((err, res) => err ? reject(err) : resolve(res.body))));

module.exports = api;
