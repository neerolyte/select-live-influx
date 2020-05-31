"use strict";
var Device = require('./Device')
module.exports = class Host {
	constructor(options) {
		this._host = options.host;
		this._bent = options.bent;
	}
	getDevicesUrl() {
		return `http://${this._host}/cgi-bin/solarmonweb/devices`;
	}
	async getJson(url) {
		return this._bent('json')(url);
	}
	async getDevice() {
		return this.getJson(this.getDevicesUrl()).then((data) => {
			return new Device(this, data[0].id);
		});
	}
}