"use strict";

var port = process.env.PORT || 1337;
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/',
	function(req, res) {
		res.redirect('index.html');
	});

app.listen(port);
