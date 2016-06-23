function listFiles(rootDir, response) {
	// body...
	var walk = require('walk'),
		files   = [];

	var walker  = walk.walk(rootDir, { followLinks: false });
	var dirCount = 1;
	walker.on('directory', function (root, dirStatsArray, next) {
		// var obj = {path:root, name: dirStatsArray.name, type:stat.type};
		var obj = {
			path:root, 
			name: dirStatsArray.name, 
			type: dirStatsArray.type,
			isParent:true
		};
		files.push(obj);
		next();
	});
	walker.on('file', function(root, stat, next) {
		// Add this file to the list of files
		var fullPath = root + '/' + stat.name;
		var obj = {path:root, name: stat.name, type:stat.type};
		files.push(obj);
		next();
	});
	walker.on('end', function() {
		files.forEach(function(f, index){
			console.info(f.id, f.path);

		});
		response.send(files);
	});
}

module.exports = listFiles;