module.exports = {

	// ---------------------------------------
	// Custom settings
	// ---------------------------------------

	// Your RealFlow files objects folder
	source_directory: 'example',

	// Name of the RealFlow object you wish to track
	object_name: 'pyramid',

	// Where to export the files to
	export_directory: 'export',

	// Which frame numbers would you like to track?
	track_frames: [0, 40, 81, 98],

	// ---------------------------------------
	// Development settings
	// ---------------------------------------
	
	// The object extension
	object_ext: '.obj',
	
	// Which operation to perform
	operation: process.argv[2],

	// Write files
	write: true,

	// Detailed write logs
	log: true

}