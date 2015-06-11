var util = require('./util')

var proto = {
	active: function () {
		var me = this
		if(me.isActive) return
		me.isActive = true
		me.node.addClass('active')
		return me
	},
	deactive: function () {
		var me = this
		if(!me.isActive) return
		me.isActive = false
		me.node.removeClass('active')
		return me
	},
	toggleActive: function () {
		var me = this
		if(me.isActive) this.deactive()
		else this.active()
	}
}

module.exports = util.mix(proto)