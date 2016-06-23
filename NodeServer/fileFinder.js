function fileFinder(dirname, path, response){

	var fs = require('fs');
	var stat = fs.statSync(path);

	response.writeHead(200, {
	  'Content-Type': 'text',
	  'Content-Length': stat.size
	});

	var readStream = fs.createReadStream(path);
	readStream.pipe(response);
    
}

module.exports = fileFinder;