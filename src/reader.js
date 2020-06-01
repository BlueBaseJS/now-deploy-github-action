/* eslint-disable @typescript-eslint/typedef */
'use strict';

const fs = require('fs');

function readJson(path) {
	let rawdata = fs.readFileSync(path);
	return JSON.parse(rawdata);
}

function getConfigs() {
	try {
		return readJson('now.json');
	} catch (error) {
		//
	}

	try {
		return readJson('vercel.json');
	} catch (error) {
		return {};
	}
}

console.log('Loaded config file', getConfigs());
module.exports = getConfigs;
