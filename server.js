var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path');

function fileSender(request, response) {
	var fileFinder = require('./NodeServer/fileFinder');
	// console.log('query: ' + JSON.stringify(request.query));
    	var filePath = path.join(__dirname, request.query.name);
    	console.info("filePath-->",filePath);

	fileFinder(__dirname, filePath, response);
}

function listJSON (request, response) {
	console.info(request.params);
	var listFiles = require('./NodeServer/listFiles');
	var dir = path.join(__dirname, '/dummydata');
	listFiles(dir, response);
}


app.get('/list', listJSON);
app.get('/file', fileSender);
// use web folder as static supply of files..
app.use('/', express.static(__dirname + '/web'));
app.listen(2000);