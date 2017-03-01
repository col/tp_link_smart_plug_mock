const nock = require('nock');
const util = require('util');
const TPLinkProtocol = require('../tp_link_protocol');

describe('TPLinkProtocol.encrypt', () => {

  it('should ...', () => {
    var expectedBytes = [0x00, 0x00, 0x00, 0x03, 0xCA, 0xA8, 0xCB];
    expect(TPLinkProtocol.encrypt("abc")).toBe(expectedBytes);
  });

});
