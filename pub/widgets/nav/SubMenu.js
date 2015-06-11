var inherit = require('inherit')

var SubMenu = inherit({
	name: 'SubMenu',
	base: require('./ListMenu'),
	proto: {
		__constructor: function (options) {
			var me = this
			me.menuType = 'sub-menu'
			me.__base(options)
		}
	}
})

module.exports = SubMenu