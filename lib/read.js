// Core modules
var fs = require('fs')
var p = require('path')

// App modules
var config = require('../config')
var util = require('./util')

// Begin module
module.exports = function(object, frame, callback) {
	
	// Format the frame number as 5 digits
	frame = '00000'.substr(0, 5 - frame.toString().length) + frame
	var path = config.source_directory + '/' + object + '_' + frame + config.object_ext
	
	// Return an array of lines from the file path
	var output = fs.readFileSync(path).toString().split("\n") 

	return callback(null, output)
}