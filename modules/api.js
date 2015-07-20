const url = "https://whereat-server.herokuapp.com";
const http = require('superagent');

const api = {};

// (Array[LocationInitPojo]) -> Promise[Array[LocationResponse]]
api.init = (reqs) =>
  Promise.all(reqs.map(req => api.post('init', req)));

// (Array[LocationRefreshPojo]) -> Promise[Array[LocationResponse]]
api.refresh = (specs, time, lastPing) =>
  Promise.all(
    api.parseRefreshReqs(specs, time, lastPing)
      .map(req => api.post('refresh', req)));

// () -> Promise[String]
api.erase = () => (
  new Promise(
    (resolve, reject) => http
      .post(`${url}/erase`)
      .end((err, res) => err ? reject(err) : resolve(res))));

//(String, LocationPojo) => Promise[LocationResponse]
api.post = (endpoint, req) => (
  new Promise(
    (resolve, reject) => http
      .post(`${url}/${endpoint}`)
      .send(req)
      .set('Accept', 'application/json')
      .end((err, res) => err ? reject(err) : resolve(res))));

module.exports = api;
