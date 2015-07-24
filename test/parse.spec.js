const chai = require('chai');
const should = chai.should();
const parse = require('../modules/parse');
const { lSpecs, initRequests, refreshRequests, ids } = require('./samples');

describe('parse module', () => {

  describe('#initRequests', () => {

    describe('with a multiplier of 1', () => {

      it('wraps each LatLon in an #init request, maintaining its value', () => {
        const ids = parse.getUuids(lSpecs, 1);
        parse.initRequests(lSpecs, ids, 1).should.eql(initRequests);
      });
    });

    describe('with a multiplier of 3', () => {

      it('wraps n LatLons in requests, randomly offsetting the value of each', () => {
        const ids = parse.getUuids(lSpecs, 3);
        const res = parse.initRequests(lSpecs, ids, 3);
        res.length.should.equal(initRequests.length * 3);
        //max(lats.map(l => abs(orig - l))).should.beLessThan(parse.variance)
      });
    });
  });

  describe('#refreshRequests', () => {

    describe('with a multiplier of 1', () => {

      it('wraps each LatLon in a #refresh request, maintaining its value', () => {
        const ids = parse.getUuids(lSpecs, 1);
        parse.refreshRequests(lSpecs, ids, 1).should.eql(refreshRequests);
      });

      describe('with a multiplier of 3', () => {

        it('wraps n LatLons in requests, randomly offsetting the value of each', () => {
          const ids = parse.getUuids(lSpecs, 3);
          const res = parse.refreshRequests(lSpecs, ids, 3);
          console.log(JSON.stringify(res, null, 2));
          res.length.should.equal(refreshRequests.length);
          //max(lats.map(l => abs(orig - l))).should.beLessThan(parse.variance)
        });
      });
    });
  });

  describe('#ids', () => {

    it('parses an array of ids of simulated external users', () => {
      parse.ids(lSpecs).should.eql(ids);
    });
  });
});
