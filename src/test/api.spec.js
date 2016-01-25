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
const chaiAsPromised = require('chai-as-promised');
const { lSpecs, initRequests, initResponses, refreshRequests } = require('./samples');
const mockServer = require('mockserver-grunt');
const mockClient = require('mockserver-client').mockServerClient;
const _ = require('lodash');
const api = require('../main/modules/api');
api.url = ("http://localhost:1090");
chai.use(chaiAsPromised);

// const http = require('http');
// const mockserver = require('mockserver');

/**
 * NOTE: 
 * This suite marked pending b/c I can't quite figure out mockserver.
 * @agustuser 1.24.16
 */

xdescribe('api module', () => {

  // before(() => {
  //   api.url = "https://localhost:9001";
  //   http.createServer(mockserver('./apiMocks')).listen(9001);
  // });

  before(done => {
    mockClient('localhost', 1080).
      mockAnyResponse({
        'httpsRequest': {
          'method': 'POST',
          'path': '/locations/init',
          'body': {
            'type': 'JSON',
            'value': JSON.stringify(initRequests[0])
          }
        },
        'httpResponse': {
          'statusCode': 200,
          'body': JSON.stringify(initResponses[0])
        }
      });

    mockClient('localhost', 1080).
      mockAnyResponse({
        'httpRequest': {
          'method': 'POST',
          'path': '/locations/init',
          'body': {
            'type': 'JSON',
            'value': JSON.stringify(initRequests[1])
          }
        },
        'httpResponse': {
          'statusCode': 200,
          'body': JSON.stringify(initResponses[1])
        }
      });
    mockServer.start_mockserver({ serverPort: 1080, proxyPort: 1090, verbose: true});
    done();
  });
  after(done => {
    mockServer.stop_mockserver();
    done();
  });

  describe('#init', () => {

    it('returns a Promise[Array[LocationResponse]]', () =>
      api.init(initRequests).should.eventually.eql(initResponses)
    );
  });
});
