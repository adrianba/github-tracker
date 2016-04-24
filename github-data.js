"use strict";

var GitHubApi = require("github4");
var low = require('lowdb');
var storage = require('./lowdb-azurestorage');
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

	var _db = null;
	var _dbPromise = low('azure',{storage}).then(db => {
		_db = db;
	});

	// var issue = _db("issues").chain().find({issue:"x/x#1"}).assign({});
	// _db("issues").push(issue).then()

	if(config.githubToken) {
		_github.authenticate({
			type: 'token',
			token: config.githubToken
		});
	}

	this.getIssueData = function(ghuser,ghrepo) {
		return _dbPromise.then(() => getIssues(ghuser,ghrepo).then(results => {
			return results.map(issue => {
				var idb = issueFromDatabase(ghuser,ghrepo,issue.number).value();
				issue.tracker = {};
				issue.tracker.notes = idb && idb.notes ? idb.notes : "";
				issue.tracker.category = idb && idb.category ? idb.category : "not set";
				return issue;
			});
		})).catch(err => { throw err });
	};

	this.setIssueData = function(ghuser,ghrepo,number,data) {
		return _dbPromise.then(() => {
			var idb = issueFromDatabase(ghuser,ghrepo,number);
			if(idb.value()) {
				if(data.category) {
					idb.assign({category:data.category}).value();
				}
				if(data.notes) {
					idb.assign({notes:data.notes}).value();
				}
			} else {
				var item = {id:issueId(ghuser,ghrepo,number)};
				if(data.category) {
					item.category = data.category;
				}
				if(data.notes) {
					item.notes = data.notes;
				}
				_db("issues").push(item);
			}
		}).catch(err => { throw err });
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

	function issueId(ghuser,ghrepo,number) {
		return ghuser+'/'+ghrepo+'#'+number;
	}

	function issueFromDatabase(ghuser,ghrepo,number) {
		return _db("issues").chain().find({id:issueId(ghuser,ghrepo,number)});
	}


	function downloadIssues(user,repo) {
		return new Promise((resolve,reject) => {
			_github.issues.getForRepo({user,repo,per_page:1000,state:"open"},(err,result)=> {
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