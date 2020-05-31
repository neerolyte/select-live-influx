var assert = require('assert');
var Host = require('../../lib/SelectLive').Host
var Device = require('../../lib/SelectLive').Device
describe('SelectLive.Host', function() {
  describe('#getDevicesUrl()', function() {
    [
      ["example.com", "http://example.com/cgi-bin/solarmonweb/devices"],
      ["192.168.1.123", "http://192.168.1.123/cgi-bin/solarmonweb/devices"],
    ].forEach((data) => {
      var expected, host;
      [host, expected] = data;
      it(`${host} => ${expected}`, () => {
        var client = new Host({"host": host});
        assert.equal(expected, client.getDevicesUrl());
      });
    });
  });
  describe('#getDevice()', () => {
    it("Gets first device of one", async () => {
      var bentMock = function(type) {
        assert.equal('json', type);
        return async function(url) {
          assert.equal("http://foo/cgi-bin/solarmonweb/devices", url);
          return [{"id":"01234567890ABCDEF"}];
        };
      }
      var selectLive = new Host({
        "host": 'foo',
        "bent": bentMock,
      });
      var device = await selectLive.getDevice();
      assert.equal(true, device instanceof Device)
      assert.equal('01234567890ABCDEF', device.getId());
    });
  });
});