const http = require('superagent');

const api = {};

api.url = "https://whereat-server.herokuapp.com";

// (Array[LocationInitPojo]) -> Promise[Array[LocationResponse]]
api.init = (reqs) => Promise.all(reqs.map(req => api.post('init', req)));

// (Array[LocationRefreshPojo]) -> Promise[Array[LocationResponse]]
api.refresh = (reqs) => Promise.all(reqs.map(req => api.post('refresh', req)));

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
