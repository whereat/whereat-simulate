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

const chai = require('chai');
const should = chai.should();
const parse = require('../main/modules/parse');
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
});
