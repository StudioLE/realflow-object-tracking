// Core modules
var fs = require('fs')

// Node modules
var sqwk = require('sqwk')

// App modules
var config = require('../config')
var util = require('./util')

// Begin module
module.exports = function(dir, callback) {

	// Read the directory
	if(config.log) sqwk.send([['Reading directory', dir]])

	// @todo Use async
	try {
		files = fs.readdirSync(dir)
	} catch(err) {
		callback(err)
	}

	var objects = {}

	files.forEach(function(file) {	
		// If the file starts with our config.object_name and ends in .obj
		if(util.endsWith(file, config.object_ext) && util.startsWith(file, config.object_name)) {			
			// Remove the sequential frame number from the end of the file
			var obj = file.substr(0,12)
			objects[obj] = obj
		}
	}); // files.foreach

	// Convert the object to an array
	var objects_array = []
	for(obj in objects) objects_array.push(obj)

	return callback(null, objects_array)
}