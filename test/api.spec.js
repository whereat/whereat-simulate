const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
const { lSpecs, initRequests, initResponses, refreshRequests } = require('./samples');
const mockServer = require('mockserver-grunt');
const mockClient = require('mockserver-client').mockServerClient;
const _ = require('lodash');
// const http = require('http');
// const mockserver = require('mockserver');



const api = require('../modules/api');
api.url = ("http://localhost:1090");


chai.use(chaiAsPromised);

describe('api module', () => {

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
