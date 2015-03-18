// App modules
var config = require('../config')

// Begin module
module.exports = function(callback) {
	callback(null, [
		'{hr}',
		['{cyan}', 'RealFlow Object Tracking'],
		'{hr}',
		['{magenta}', 'Tracking object:', config.object_name],
		['{magenta}', 'Tracking frames:', config.track_frames.join(', ')],
		['{magenta}', 'Tracking mode:', config.track_mode],
		['{magenta}', 'Source directory:', config.source_directory],
		['{magenta}', 'Export directory:', config.export_directory],
		'{hr}'
	])
}