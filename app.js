"use strict";

var allowedAccounts = ["adrianba"];
if(process.env.TWITTER_ACCOUNTS) {
	allowedAccounts = JSON.parse(process.env.TWITTER_ACCOUNTS);
}

var port = process.env.PORT || 1337;
var config = {};
if(process.env.GITHUB_TOKEN) {
        config.githubToken = process.env.GITHUB_TOKEN;
}

var express = require('express');
var bodyParser = require('body-parser');
var githubData = require('./github-data')(config);

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use((req,res,next) => {
	var user = req.headers['x-ms-client-principal-name'];
	if(user) {
		if(allowedAccounts.indexOf(user)<0) {
			res.status(401).send("Access denied to: " + user);
			return;
		}
	}
	next();
});

app.get('/',
	function(req, res) {
		res.redirect('index.html');
	});

app.get('/issues',
	function(req, res) {
		sendIssueData(res);
	});

app.post('/issues/:issuenumber',
	function(req, res) {
		if(!req.is("application/json")) {
			res.status(400).send("Invalid content type");
			return;
		}
		githubData.setIssueData(req.params.issuenumber,req.body);
		sendIssueData(res);
	});

app.listen(port);

function sendIssueData(res) {
	githubData.getIssueData().then(data => {
		res.json({ issues: data });
	}).catch(err => {
		console.error(err);
		res.type('text/plain');
		res.status(500).send(err);
	});
}