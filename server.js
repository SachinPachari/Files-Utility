var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
    mime = require('mime');

function fileDownloader(request, response) {
    var name = request.params.file;
//    console.info(request.body);
//    var filePath = request.body.file;
    var filePath = path.join(__dirname, '/dummydata', name);
    
    var filename = path.basename(filePath);
    var mimetype = mime.lookup(filePath);
    response.setHeader('Content-disposition', 'attachment; filename=' + filename);
    response.setHeader('Content-type', mimetype);
    response.download(filePath);
//	fileFinder(__dirname, filePath, response);
}

function listJSON (request, response) {
	var listFiles = require('./NodeServer/listFiles');
	var dir = path.join(__dirname, '/dummydata');
	listFiles(dir, response);
}

function fileSender(request, response) {
    var name = request.params.file;
    var filePath = path.join(__dirname, '/dummydata', name);
    var fileFinder = require('./NodeServer/fileFinder');
    fileFinder(__dirname, filePath, response);
}

app.get('/list', listJSON);
app.get('/api-download/:file', fileDownloader);
app.get('/api-send/:file', fileSender);
// use web folder as static supply of files..
app.use('/', express.static(__dirname + '/web'));
app.listen(2000);