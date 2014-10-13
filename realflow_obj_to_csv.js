
// Config

//// Directories
var source_dir = 'source'; //'objects';
var output_dir = 'output';

//// File  name
var object_name = 'pyramid'
var object_ext = '.obj';

//// Frames to export
var frames = [0, 40, 81, 98]; //[0, 8, 50, 100, 150, 200, 250, 300, 350, 380];

//// Development settings
var write = true;
var log = true;



// Global vars

var fs = require('fs');
var d = new Date();
var time = [
	d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()
].join('-');

// Script

if(write) {
	// Create a directory for the output
	fs.mkdirSync(output_dir +'/'+ time);
}
//if(err) throw err;

list_obj(source_dir).forEach(function(object) {
	if(log) console.log(object);
	var coords = Array();
	// For every frame read the coordinate data from the .obj file
	for(var i in frames) {
		coords.push(process_obj(read_obj(object, frames[i])).join());
	}
	// Place each frame on a new line
	coords = coords.join("\n");
	console.log(coords);

	var path = output_dir +'/'+ time +'/'+ object +'.csv';
	if(write) {
		fs.writeFile(path, coords, function(err) {
			if(err) throw err;
			if(log) console.log('Data written to: ' + path);
		});
	}
	else {
		if(log) console.log('Writing disabled: ' + path);
	}
}); // foreach objects



// Functions

function list_obj() {
	// Read the directory
	files = fs.readdirSync(source_dir);

	//function(err, files) {
	//if(err) throw err;
	//console.log(files);
	var objects = new Object();

	files.forEach(function(file) {
		var path = source_dir + '/' + file;
		
		// If the file starts with our object_name and ends in .obj
		if(endsWith(file, object_ext) && startsWith(file, object_name)) {			
			// Remove the sequential frame number from the end of the file
			var obj = file.substr(0,12);
			objects[obj] = obj;
			//console.log('Pyramid object: ' + file);
		}
		// If directory
		else if(fs.lstatSync(path).isDirectory()) {
			//console.log('Directory: ' + file);
		}
		// Must be something else
		else {
			//console.log('Unknown file:' + file);
		}
	}); // files.foreach

	// Convert the object to an array
	var objects_array = Array();
	for(obj in objects) objects_array.push(obj);

	return objects_array;
}

function read_obj(object, frame) {
	// Format the frame number as 5 digits
	frame = '00000'.substr(0, 5 - frame.toString().length) + frame;
	var path = source_dir + '/' + object + '_' + frame + object_ext;
	
	// Return an array of lines from the file path
	return fs.readFileSync(path).toString().split("\n");
}

function process_obj(lines) {
			
	// The first 4 lines will read as follows:
	// v -2.229370 3.953948 0.292453
	// Get the max and min values of each
	var vertices = Array();
	lines.slice(0, 4).forEach(function(vertex) {
		vertices.push(vertex.split(' '));
	});
	var max = Object();
	var min = Object();
	var mid = Object();

	// Find the midpoint of x, y, z
	for(var i = 1; i <= 3; i++) {
		// Get x, y or z of each vertice
		verts = [
			vertices[0][i], vertices[1][i], vertices[2][i], vertices[3][i]
		];
		// Find the mid & max of these values
		max[i] = Math.max.apply(Math, verts);
		min[i] = Math.min.apply(Math, verts);
		// Calculate the middle
		mid[i] = (max[i] + min[i]) / 2;
	}

	// Convert the object to an array
	var mid_array = Array();
	for(var i in mid) mid_array.push(mid[i]);

	return mid_array;
}



// Helper Functions

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, prefix) {
	return str.indexOf(prefix) === 0;
}

