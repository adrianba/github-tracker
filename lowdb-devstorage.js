"use strict";

const json = require('lowdb/json');
const fileAsync = require('lowdb/file-async')

const location = __dirname + '/db.json';

function devRead(source, deserialize) {
	deserialize = deserialize || json.parse;
	return new Promise((resolve,reject) => {
		resolve(fileAsync.read(location,deserialize));
	});
}

function devWrite(dest,obj,serialize) {
	serialize = serialize || json.stringify;
	return fileAsync.write(location,obj,serialize);
}

module.exports = { read:devRead, write: devWrite };