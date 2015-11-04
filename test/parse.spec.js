const chai = require('chai');
const should = chai.should();
const parse = require('../modules/parse');
const { lSpecs, updateRequests, initRequests, refreshRequests, ids } = require('./samples');
const { max, floor } = require('lodash');
const { abs } = Math;

describe('parse module', () => {

  describe('#getUuids', () => {

    it('generates an array of n UUIDs -- where n is specs.length * multiplier', () => {
      parse.getUuids(lSpecs,3).length.should.equal(6);
    });
  });

  describe('#updateRequests', () => {

    describe('with a multiplier of 1', () => {

      it('wraps each LatLon in an #update request, maintaining its value', () => {
        const ids = parse.getUuids(lSpecs, 1);
        parse.updateRequests(lSpecs, ids, 1).should.eql(updateRequests);
      });
    });

    describe('with a multiplier of 3', () => {

      it('generates 3 requests for each LatLon, offsetting the value of last 2', () => {

        const ids = parse.getUuids(lSpecs, 3);
        const reqLists = parse.updateRequests(lSpecs, ids, 3);
        reqLists.length.should.equal(updateRequests.length);

        reqLists.forEach((reqs, i) => {
          reqs.length.should.equal(6);

          reqs.forEach((req, j) => {
            req.hasOwnProperty('lastPing').should.beTrue;
            req.hasOwnProperty('location').should.beTrue;
            req.lastPing.should.equal(0);

            switch(j){
            case 0:
              req.location.id.should.equal(lSpecs.http[0].id);
              break;
            case 3:
              req.location.id.should.equal(lSpecs.http[1].id);
              break;
            default:
              req.location.id.should.equal(ids[j-1]);
              break;
            }

            abs(req.location.lat - updateRequests[i][floor(j/3)].location.lat)
              .should.be.below(parse.variance);

            abs(req.location.lon - updateRequests[i][floor(j/3)].location.lon)
              .should.be.below(parse.variance);

            req.location.time.should.equal(lSpecs.time);
          });
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
