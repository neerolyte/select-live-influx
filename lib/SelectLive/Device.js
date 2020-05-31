"use strict";
module.exports = class Device {
	constructor(host, id) {
		this._host = host;
		this._id = id;
	}
	getId() {
		return this._id;
	}
	async getPoint() {
		var url = `${this._host.getDevicesUrl()}/${this._id}/point`;
		var data = await this._host.getJson(url);
		var items = data.items;
		var timestamp = new Date(items.timestamp*1000);
		delete items.timestamp;
		return {
			"items": items,
			"timestamp": timestamp,
		};
	}
}