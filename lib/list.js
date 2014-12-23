// Core modules
var fs = require('fs')

// App modules
var config = require('../config')
var util = require('./util')

// Begin module
module.exports = function(dir, callback) {

	// Read the directory
	if(config.log) console.log('Reading directory: ' + dir)

	// @todo Check for errors
	// @todo Use async
	files = fs.readdirSync(dir)

	//function(err, files) {
	//if(err) throw err
	//console.log(files)
	var objects = {}

	files.forEach(function(file) {		
		// If the file starts with our config.object_name and ends in .obj
		if(util.endsWith(file, config.object_ext) && util.startsWith(file, config.object_name)) {			
			// Remove the sequential frame number from the end of the file
			var obj = file.substr(0,12)
			objects[obj] = obj
			//console.log('Pyramid object: ' + file)
		}
	}); // files.foreach

	// Convert the object to an array
	var objects_array = []
	for(obj in objects) objects_array.push(obj)

	return callback(null, objects_array)
}