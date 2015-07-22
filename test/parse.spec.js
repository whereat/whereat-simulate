const chai = require('chai');
const should = chai.should();
const parse = require('../modules/parse');
const { lSpecs, initRequests, refreshRequests } = require('./samples');

describe('parse module', () => {

  describe('#initRequests', () => {

    it('parses an Array[LocationInitPojo]', () => {
      parse.initRequests(lSpecs).should.eql(initRequests);
    });
  });

  describe('#refreshRequests', () => {

    it('parses an Array[Array[LocationRefreshPojo]]', () => {
      const res = parse.refreshRequests(lSpecs);
      console.log(res);
      //res.length.should.equal(3);
      res.should.eql(refreshRequests);
    });
  });
});
