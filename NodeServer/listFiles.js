/* global require, module */
function listFiles(rootDir, response) {
    'use strict';
	// body...
	var walk = require('walk'),
        path = require('path'),
		files   = [];

	var walker  = walk.walk(rootDir, { followLinks: false });
	var dirCount = 0;
    
	walker.on('directory', function (root, dirStatsArray, next) {
		var obj = {
            path:root, 
            name: dirStatsArray.name,
            fullPath: path.join(root, dirStatsArray.name),
            type: dirStatsArray.type,
            isParent:true
        };
        obj.id = (++dirCount)+'';
		files.push(obj);
		next();
	});
	walker.on('file', function(root, stat, next) {
		// Add this file to the list of files
		var fullPath = path.join(root, stat.name);
		var obj = {path:root, name: stat.name, type:stat.type, fullPath: fullPath};
        obj.id = (++dirCount)+'';
		files.push(obj);
		next();
	});
	walker.on('end', function() {
        files = makeJSON(files);
		response.send(files);
	});
    
    function makeJSON (files) {
        files.forEach(function (f, index) {
            var parent = getParent(f);
            if(parent === undefined || parent.id === undefined){
                return;
            }
            f.pId = parent.id;
        });
        files.forEach(function (f, index) {
            f.fullPath = f.fullPath.replace(rootDir, '');
        });
        return files;
    }
    function getParent (f) {
        for(var i = 0, length = files.length; i < length; i++){
            if(files[i].fullPath === f.path){ 
                return files[i];
            }
        }
        return;
    }
}

module.exports = listFiles;