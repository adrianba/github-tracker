"use strict";

var repoList = process.env.TWITTER_ACCOUNTS || '[{"repo":"w3c/browser-payment-api","users":["adrianba"]},{"repo":"w3c/html","users":["adrianba"]}]';
var repoConfig = JSON.parse(repoList);

var port = process.env.PORT || 1337;
var config = { useAzure:process.env.NODE_ENV === "production" };
if(process.env.GITHUB_TOKEN) {
    config.githubToken = process.env.GITHUB_TOKEN;
}

var express = require('express');
var bodyParser = require('body-parser');
var githubData = require('./github-data')(config);

var app = express();

app.use((req,res,next) => {
	var user = req.headers['x-ms-client-principal-name'] || "adrianba";
	var repos = repoConfig.filter(repo => repo.users.indexOf(user)>=0);
	if(repos.length===0) {
		res.status(401).send("Access denied to: " + user);
		return;
	}
	req.user = user;
	next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/repos',
	function(req,res) {
		var repos = repoConfig
			.filter(repo => repo.users.indexOf(req.user)>=0)
			.map(repo => repo.repo);
		res.json({repos,user:req.user});
	});

app.get('/issues/:ghuser/:ghrepo',
	function(req, res) {
		sendIssueData(req.params.ghuser,req.params.ghrepo,req.user,res);
	});

app.post('/issues/:ghuser/:ghrepo/:issuenumber',
	function(req, res) {
		if(!req.is("application/json")) {
			res.status(400).send("Invalid content type");
			return;
		}
		githubData.setIssueData(req.params.ghuser,req.params.ghrepo,req.params.issuenumber,req.body);
		sendIssueData(req.params.ghuser,req.params.ghrepo,req.user,res);
	});

app.listen(port);

function sendIssueData(ghuser,ghrepo,user,res) {
	githubData.getIssueData(ghuser,ghrepo).then(data => {
		var response = { issues: data };
		if(user) { response.user = user; }
		res.json(response);
	}).catch(err => {
		console.error(err);
		res.type('text/plain');
		res.status(500).send(err);
	});
}