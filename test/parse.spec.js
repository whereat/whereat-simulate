const chai = require('chai');
const should = chai.should();
const parse = require('../modules/parse');
const { lSpecs, initRequests, refreshRequests, ids } = require('./samples');

describe('parse module', () => {

  describe('#initRequests', () => {

    describe('with a multiplier of 1', () => {

      it('wraps each LatLon in an #init request, maintaining its value', () => {
        parse.initRequests(1, lSpecs).should.eql(initRequests);
      });
    });
  });

  describe('#refreshRequests', () => {

    describe('with a multiplier of 1', () => {

      it('wraps each LatLon in a #refresh request, maintaining its value', () => {
        console.log(parse.refreshRequests(1, lSpecs));
        parse.refreshRequests(1, lSpecs).should.eql(refreshRequests);
      });
    });
  });

  describe('#ids', () => {

    it('parses an array of ids of simulated external users', () => {
      parse.ids(lSpecs).should.eql(ids);
    });
  });
});
