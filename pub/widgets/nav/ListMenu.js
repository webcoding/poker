var inherit = require('inherit')
var Visible = require('modules/mixClass/Visible')
var Mask = require('modules/mixClass/Mask')
var Activable = require('modules/mixClass/Activable')
var Be = require('modules/mixClass/Be')
var tplFn = require('./ListMenu.html')
//var IconType = require('widgets/nav/_TypeIcon')

var MenuItem = inherit({
	name: 'MenuItem',
	proto: {
		/**
		 *
		 * @param node
		 */
		__constructor: function (options) {
			var me = this
			$.extend(me, options)

			me.nodeAnchor = me.nodeIcon = $('a', me.node)
		}
	}
})
Activable.mixTo(MenuItem)
Be.mixTo(MenuItem)

var SubMenu = inherit({
	name: 'SubMenu',
	proto: {
		/**
		 * @param data
		 */
		__constructor: function (options) {
			var me = this

			me.data = options.data
			var html = tplFn({
				menus: me.data,
				menuType: me.menuType
			})
			me.isHide = true
			me.node = $(html)
			me.nodeList = $('ul', me.node)

			me.menuItems = []
			$('.menu-item', this.node).each(function (i, menuNode) {
				var menuItem = new MenuItem({node: $(menuNode)})
				var iconType = me.data[i].iconType
				if(iconType){
					menuItem.beIcon(iconType)
				}
				me.menuItems.push(menuItem)
			})

			me.mask_constructor(options)
			me.bindEvent()
		},
		bindEvent: function(){
			this.mask_bindEvent()
		},
		unbindEvent: function(){
			this.mask_unbindEvent()
		},
		getMenuItem: function (index) {
			return this.menuItems[index]
		},
		activeMenu: function (index) {
			if(index !== this.index){
				var prevItem = this.getMenuItem(this.index)
				prevItem && prevItem.deactive()

				this.getMenuItem(index).active()
				this.index = index
			}
		},
		destroy: function () {
			this.unbindEvent()
			this.node.remove()
		}
	}
})
Visible.mixTo(SubMenu)
Mask.mixTo(SubMenu)

module.exports = SubMenu