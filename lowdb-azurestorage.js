"use strict";

const json = require('lowdb/json');
var host = process.env.DOCDB_HOST;
var masterKey = process.env.DOCDB_KEY;

var DocumentDBClient = require('documentdb').DocumentClient;
var client = new DocumentDBClient(host, {masterKey: masterKey});

function azureRead(source, deserialize) {
	deserialize = deserialize || json.parse;
	return new Promise((resolve,reject) => {
		getCollection().then(collection => {
			client.queryDocuments(collection._self,'SELECT TOP 1 * FROM docs d ORDER BY d.timestamp DESC').toArray((err,results)=>{
				if(err) { err.step = "queryDocuments"; return reject(err); }
				var data = results.length===1 ? results[0].data : '{}';
				resolve(deserialize(data));
			});
		}).catch(err => {
			reject(err);
		});
	});
}

function azureWrite(dest,obj,serialize) {
	serialize = serialize || json.stringify;
	return new Promise((resolve,reject) => {
		getCollection().then(collection => {
			var id = Date.now().toString();
			const document = {
				id,
				timestamp: id,
				data: serialize(obj)
			};
			client.createDocument(collection._self,document,(err,result) => {
				if(err) { return reject(err); }
				resolve(result);
			});
		}).catch(err => {
			reject(err);
		});
	});
}

function getDatabase() {
	return new Promise((resolve,reject) => {
		var q = { query: 'SELECT * FROM root r WHERE r.id = @id',
		  parameters: [ { name: '@id', value: 'github-tracker' } ] };
		client.queryDatabases(q).toArray((err,results) => {
			if(err) { err.step = "queryDatabases"; return reject(err); }
			resolve(results[0]);
		});
	});
}

function getCollection() {
	return new Promise((resolve,reject) => {
		getDatabase().then(database => {
			var q = { query: 'SELECT * FROM root r WHERE r.id = @id',
			  parameters: [ { name: '@id', value: 'issues' } ] };
			client.queryCollections(database._self,q).toArray((err,results) => {
				if(err) { err.step = "queryCollections"; return reject(err); }
				resolve(results[0]);
			});
		}).catch(err => { reject(err); });
	});
}

module.exports = { read:azureRead, write: azureWrite };