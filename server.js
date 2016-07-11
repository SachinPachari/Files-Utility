var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
    mime = require('mime'),
    folderPath;

function fileDownloader (request, response) {
    var name = request.query.file;
    var filePath = path.join(getFolderPath(), name);
    var filename = path.basename(filePath);
    var mimetype = mime.lookup(filePath);
    response.setHeader('Content-disposition', 'attachment; filename=' + filename);
    response.setHeader('Content-type', mimetype);
    response.download(filePath);
}

function listFilesJSON (request, response) {
	var listFiles = require('./NodeServer/listFiles');
	listFiles(getFolderPath(), response);
}

function fileSender (request, response) {
    var name = request.params.file;
    var filePath = path.join(getFolderPath(), name);
    var fileFinder = require('./NodeServer/fileFinder');
    fileFinder(getFolderPath(), filePath, response);
}


function folderPathUsed (request, response) {
    response.send(getFolderPath());
}

function getFolderPath () {
    if(folderPath !== undefined){
        return folderPath;
    }
    var propertiesFile = fs.readFileSync("properties.json");
    var properties = JSON.parse(propertiesFile);
    if(properties !== undefined && properties.path !== undefined){
        if(doesFileExist(properties.path)){
            folderPath = properties.path;
            return folderPath;     
        }
    }
    folderPath = path.join(__dirname, '/dummydata');
    return folderPath;
}

function doesFileExist (path) {
    fs.stat(path, function(err, stat) {
        if(err == null) {
            return true;
        } 
        return false;
    });
}

app.get('/app-desc', folderPathUsed);
app.get('/list', listFilesJSON);
app.get('/api-download', fileDownloader);
app.get('/api-send/:file', fileSender);
// use web folder as static supply of files..
app.use('/', express.static(__dirname + '/web'));

app.listen(2000);