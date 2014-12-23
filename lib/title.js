// Node modules
var chalk = require('chalk')

// App modules
var config = require('../config')

// Begin module
module.exports = function(callback) {
	callback(null, [
		'<hr>',
		chalk.cyan('RealFlow Object Tracking'),
		'<hr>',
		chalk.magenta('Tracking object: ') + config.object_name,
		chalk.magenta('Tracking frames: ') + config.track_frames.join(', '),
		chalk.magenta('Tracking mode: ') + config.track_mode,
		chalk.magenta('Source directory: ') + config.source_directory,
		chalk.magenta('Export directory: ') + config.export_directory,
		'<hr>'
	])
}