const http = require('superagent');

const api = {};

api.url = "https://api-dev.whereat.io";

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
