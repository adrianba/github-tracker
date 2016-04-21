"use strict";

var GitHubApi = require("github4");
var low = require('lowdb');
var storage = require('lowdb/file-async');
var NodeCache = require('node-cache');

function GitHubData(config) {
	config = config || {};

	var _github = new GitHubApi({
	    version: "3.0.0",
	    //debug: true,
	    protocol: "https"
	});

	var _dataCache = new NodeCache({
		stdTTL: 60,
		checkPeriod: 10
	});

	var _db = low(__dirname + '/db.json', { storage });
	const _githubUser = 'w3c';
	const _githubRepo = 'browser-payment-api';

	// var issue = _db("issues").chain().find({issue:"x/x#1"}).assign({});
	// _db("issues").push(issue).then()

	if(config.githubToken) {
		_github.authenticate({
			type: 'token',
			token: config.githubToken
		});
	}

	this.getIssueData = function() {
		return getIssues(_githubUser,_githubRepo).then(results => {
			return results.map(issue => {
				var idb = issueFromDatabase(issue.number).value();
				issue.tracker = {};
				issue.tracker.notes = idb && idb.notes ? idb.notes : "";
				issue.tracker.category = idb && idb.category ? idb.category : "not set";
				return issue;
			});
		});
	};

	this.setIssueData = function(number,data) {
		var idb = issueFromDatabase(number);
		if(idb.value()) {
			if(data.category) {
				idb.assign({category:data.category}).value();
			}
			if(data.notes) {
				idb.assign({notes:data.notes}).value();
			}
		} else {
			var item = {id:issueId(number)};
			if(data.category) {
				item.category = data.category;
			}
			if(data.notes) {
				item.notes = data.notes;
			}
			_db("issues").push(item);
		}
	};

	function getIssues(user,repo) {
		return new Promise((resolve,reject) => {
			var cacheName = "issues-" + user + "/" + repo;
			_dataCache.get(cacheName,(err,data)=> {
				if(!err && data) {
					resolve(data);
				} else {
					downloadIssues(user,repo).then(data => {
						_dataCache.set(cacheName,data);
						resolve(data);
					}).catch(e => {
						reject(e);
					});
				}
			});
		});
	}

	function issueId(number) {
		return _githubUser+'/'+_githubRepo+'#'+number;
	}

	function issueFromDatabase(number) {
		return _db("issues").chain().find({id:issueId(number)});
	}


	function downloadIssues(user,repo) {
		return new Promise((resolve,reject) => {
			_github.issues.getForRepo({user:user,repo:repo,per_page:1000,state:"open"},(err,result)=> {
				if(err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

};

module.exports = function(config) {
	return new GitHubData(config);
};