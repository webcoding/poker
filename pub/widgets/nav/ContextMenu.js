var inherit = require('inherit')

var Align = {
	LEFT: 'left',
	RIGHT: 'right'
}

var ContextMenu = inherit({
	name: 'ContextMenu',
	base: require('./ListMenu'),
	proto: {
		__constructor: function (options) {
			var me = this
			me.menuType = 'context-menu'
			me.__base(options)

			//me.align = Align.LEFT
			//me.index = 0
		},
		setLayoutInfo: function(align, index){
			var me = this
			if(me.align !== align){
				me.nodeList.removeClass(me.align).addClass(me.align = align)
			}
			if(me.index !== index){
				me.nodeList.removeClass('menu' + me.index).addClass('menu' + (me.index = index))
			}
			return this
		}
	},
	statics: {
		Align: Align
	}
})

module.exports = ContextMenu