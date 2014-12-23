// Begin module
module.exports = {

	machine_date: function(d) {
		return [
			d.getFullYear(),
			d.getMonth()+1,
			d.getDate(),
			d.getHours(),
			d.getMinutes(),
			d.getSeconds()
		].join('-')
	},

	endsWith: function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1
	},

	startsWith: function(str, prefix) {
		return str.indexOf(prefix) === 0
	}
}