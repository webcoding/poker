var inherit = require('inherit')
var tplFn = require('./nav.html')
var SubMenu = require('./SubMenu')
var Visible = require('modules/mixClass/Visible')
var app = require('modules/common/app')

var Tab = inherit({
	name: 'Tab',
	proto: {
		__constructor: function(options){

			var tabData = options
			var macroCompiledContext = {}
			tplFn(macroCompiledContext)
			var html = macroCompiledContext.macro_tab(tabData).toString().trim()
			
			this.node = $(html)
			this.isHide = false
			this.nodeAnchor = $('a', this.node)

			this._subMenu(options.subMenu)
			this._updateStatus(options)

			this.bindEvent()
		},
		update: function(options, reuse){
			options.url && this.nodeAnchor.attr('href', options.url)
			options.text && this.nodeAnchor.text(options.text)
			options.active !== undefined && this.node[options.active ? 'addClass' : 'removeClass']('active')
			this._updateStatus(options)

			if(reuse){
				this._subMenu(options.subMenu)
				this.bindEvent()
			}

			this.show()
			return this
		},
		_updateStatus: function(options){
			if(options.active !== undefined) this.active = options.active
		},
		_subMenu: function (subMenu) {
			if(subMenu){
				if(this.subMenu) this.subMenu.destroy()
				this.subMenu = new SubMenu({data: subMenu})
				this.subMenu.node.appendTo(app.container)
			}
		},
		activeSubMenu: function (index) {
			if(this.subMenu){
				this.subMenu.activeMenu(index)
				var data = this.subMenu.data[index]
				this.update({
					text: data.title || data.name,
					url: data.url
				})
			}
		},
		bindEvent: function () {
			this.node.on('click', 'a', $.proxy(this.onAnchorClick, this))
		},
		restore: function () {
			this.unbindEvent()
			this.subMenu && this.subMenu.hide()
			return this
		},
		unbindEvent: function () {
			this.node.off('click')
		},
		onAnchorClick: function (e) {
			if(this.active){
				e.preventDefault()

				this.subMenu && this.subMenu.toggleVisible()
			}
		}
	}
})
Visible.mixTo(Tab)

module.exports = Tab