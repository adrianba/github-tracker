"use strict";

var storage = require('lowdb/file-async');

function azureRead(source, deserialize) {
	return storage.read(source,deserialize);
}

function azureWrite(dest,obj,serialize) {
	return storage.write(dest,obj,serialize);
}

modules.export = { read:azureRead, write: azureWrite };