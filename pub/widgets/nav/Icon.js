var inherit = require('inherit')
var tplFn = require('./Icon.html')
var Visible = require('modules/mixClass/Visible')

var Icon = inherit({
	name: 'Icon',
	proto: {
		/**
		 * @param data
		 */
		__constructor: function (options) {
			var me = this
			me.data = options.data
			var html = tplFn(me.data)
			me.node = $(html)

			if(options.onClick){
				me.node.on('click', $.proxy(options.onClick, me))
			}
		}
	}
})
Visible.mixTo(Icon)

module.exports = Icon