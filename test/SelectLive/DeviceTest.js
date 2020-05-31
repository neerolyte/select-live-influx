var assert = require('assert');
var Host = require('../../lib/SelectLive').Host
var Device = require('../../lib/SelectLive').Device
describe('SelectLive.Device', function() {
  describe('#getPoint()', () => {
    it('Gets the point', async () => {
      var hostMock = {
        getJson: async function(url) {
          assert.equal("http://foo/cgi-bin/solarmonweb/devices/bar/point", url)
          return {
            "items": {
              "load_w": 123.45,
              "battery_w": 1234.5,
              "timestamp": 1590926304,
            },
          }
        },
        getDevicesUrl: function() {
          return 'http://foo/cgi-bin/solarmonweb/devices';
        }
      }
      var device = new Device(hostMock, 'bar')
      assert.deepEqual({
        "items": {
          "load_w": 123.45,
          "battery_w": 1234.5,
        },
        "timestamp": new Date(1590926304000),
      }, await device.getPoint())
    })
  })
});