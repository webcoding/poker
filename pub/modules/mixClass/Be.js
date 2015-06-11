var util = require('./util')

var proto = {
	beIcon: function (iconType) {
		var me = this
		if(me.iconType) me.nodeIcon.removeClass(me.iconType)
		me.nodeIcon.addClass('iconfont').addClass(iconType)
		me.iconType = iconType
		return me
	},
	restoreIcon: function () {
		var me = this
		if(me.iconType) me.nodeIcon.removeClass(me.iconType)
		me.iconType = null
		return me
	}
}

module.exports = util.mix(proto)