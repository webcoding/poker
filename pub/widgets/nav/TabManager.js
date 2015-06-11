var inherit = require('inherit')
var tplFn = require('./nav.html')
var Tab = require('./Tab')
var Visible = require('modules/mixClass/Visible')
var app = require('modules/common/app')

var caches = {}
var Type = {
	// 在顶部第二层导航，完整的一个导航条
	SUB_NAVIGATION_BAR: 'sub_nav_bar',
	// 在顶部第一层导航，但是是在导航按钮内部使用
	NAVIGATION_BUTTON: 'nav_button'
}

var TabManager = inherit({
	name: 'TabManager',
	proto: {
		__constructor: function(type){
			// 如果已经存在，就直接返回，而不会调用构造函数返回新的实例
			//if(caches[type]) return caches[type]

			var me = this

			me.type = type

			me.tabs = []
			// 被删掉的tab并不会真的删掉，以备什么时候还需要增加
			me._tabsRemoved = []

			var macroCompiledContext = {}
			tplFn(macroCompiledContext)
			var html = macroCompiledContext.macro_tab_manager().toString().trim()

			me.node = $(html)

			// 默认是显示的状态
			me.onShow()
		},
		hideSubMenu: function () {
			var me = this
			me.tabs.forEach(function (tab) {
				tab.subMenu && tab.subMenu.hide()
			})
		},
		getTab:function(index){
			var me = this
			return me.tabs[index]
		},
		addTabs: function(optionsArr){
			var me = this
			optionsArr.forEach(function(options){
				me.addTab(options)
			})
			return me
		},
		addTab: function(options){
			var me = this
			var tab
			if(me._tabsRemoved.length)
				tab = me._tabsRemoved.pop()
			if(tab){
				tab.update(options, true)
			}
			else{
				tab = new Tab(options)
			}
			me.tabs.push(tab)
			me.node.append(tab.node)
			return me
		},
		removeTab: function(indexOrTab){
			var me = this
			if(indexOrTab === undefined) indexOrTab = me.tabs.length - 1
			else if(indexOrTab instanceof Tab) indexOrTab = me.tabs.indexOf(indexOrTab)
			var tab = me.tabs.splice(indexOrTab, 1)
			if(tab){
				me._tabsRemoved.push(tab)
				tab.restore().node.remove()
			}
			return me
		},
		restore: function(){
			var me = this
			me.tabs.forEach(function(tab){
				tab.restore().update({active: false})
			})
			return me
		},
		onShow: function () {
			var me = this
			if(me.type == Type.SUB_NAVIGATION_BAR){
				app.beStatus(app.STATUS_NAV_SUB_NAVIGATION_BAR)
			}
		},
		onHide: function () {
			var me = this
			if(me.type == Type.SUB_NAVIGATION_BAR) {
				app.beStatus(app.STATUS_NAV_ALONE)
			}
		}
	},
	statics: {
		Type: Type
	}
})
Visible.mixTo(TabManager)

module.exports = TabManager