var inherit = require('inherit')

var ServerDate = inherit({
	name: 'ServerDate',
	proto: {
		__constructor: function(serverNow){
			var now = Date.now()
			this.diff = ServerDate.php2js(serverNow) - now
		},
		now: function(){
			return Date.now() + this.diff
		}
	},
	statics: {
		php2js: function(ts){
			return ts * 1000
		},
		js2php: function(ts, toInt){
			var r = ts / 1000
			return toInt ? Math.round(r) : r
		}
	}
})

module.exports = ServerDate