const chai = require('chai');
const should = chai.should();
const parse = require('../modules/parse');
const { lSpecs, initRequests, refreshRequests, ids } = require('./samples');

describe('parse module', () => {

  describe('#initRequests', () => {

    it('parses an Array[LocationInitPojo]', () => {
      parse.initRequests(lSpecs).should.eql(initRequests);
    });
  });

  describe('#refreshRequests', () => {

    it('parses an Array[Array[LocationRefreshPojo]]', () => {
      parse.refreshRequests(lSpecs).should.eql(refreshRequests);
    });
  });

  describe('#ids', () => {

    it('parses an array of ids of simulated external users', () => {
      parse.ids(lSpecs).should.eql(ids);
    });
  });
});
