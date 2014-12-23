// Core modules
var fs = require('fs')
var p = require('path')

// App modules
var config = require('../config')
var util = require('./util')

// Begin module
module.exports = function(lines, callback) {

	// The first 4 lines will read as follows:
	// v -2.229370 3.953948 0.292453
	var vertices = []
	lines.slice(0, 4).forEach(function(vertex) {
		vertices.push(vertex.split(' '))
	})

	if(config.track_mode == 'mid') {
		var max = {}
		var min = {}
		var mid = {}

		// Find the midpoint of x, y, z
		for(var i = 1; i <= 3; i++) {
			// Get x, y or z of each vertice
			verts = [
				vertices[0][i], vertices[1][i], vertices[2][i], vertices[3][i]
			]
			// Find the mid & max of these values
			max[i] = Math.max.apply(Math, verts)
			min[i] = Math.min.apply(Math, verts)
			// Calculate the middle
			mid[i] = (max[i] + min[i]) / 2
		}

		// Convert the object to an array
		var mid_array = []
		for(var i in mid) mid_array.push(mid[i])

		callback(null, mid_array)
	}
	else {
		var vertices_array = []
		for(var i in vertices) {
			vertices_array = vertices_array.concat(vertices[i].slice(1))
		}
		callback(null, vertices_array)
	}
}