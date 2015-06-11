var navUtil = require('navUtil')
var inherit = require('inherit')
var inheritUtil = require('venders/inherit/util')
var _ = require('_')
var Action = require('modules/action/action')
var Button = require('./Button')
//var Tab = require('./Tab')
var tplFn = require('./nav.html')
var url = require('url')
var app = require('modules/common/app')

var qs = url.parseSearch()

var AppNav = inherit({
	name: 'AppNav',
	proto: inheritUtil.delegatePropertyMethod({
		__constructor: function (options) {
			var me = this

			var macroCompiledContext = {}
			tplFn(macroCompiledContext)
			me.html = macroCompiledContext.macro_main().toString().trim()
			//me.html = tplFn()
			me.node = $(me.html)
			//me.tabs = []
			me.nodeMain = $('.app-nav-main', me.node)
			me.nodeTabsWrap = $('.app-nav-tab-container', me.node)
			me.btnLeft = new Button({
				node: $('.btn-left', me.node),
				proportion: 0.25
			})
			me.btnRight = new Button({
				node: $('.btn-right', me.node),
				proportion: 0.25
			})
			me.btnCenter = new Button({
				node: $('.title', me.node),
				proportion: 0.5,
				sync2Title: true
			})

			Action.add({
				node: me.nodeTabsWrap,
				delegate: true,
				selector: '.tab a'
			})

			if(qs.navbar !== 'no'){
				// 此时 node 还没有被添加到 dom 上去，所以，使用 node.show() 是无效的
				me.node.css('display', 'block')
			}

			me.extraIcons = []
		},
		addExtraIcon: function (icon) {
			var me = this
			if(me.extraIcons.indexOf(icon) < 0){
				me.nodeMain.append(icon.node)
				me.extraIcons.push(icon)
			}
		},
		addTabManager: function (tabManager) {
			if(tabManager === this.tabManager) return

			this.tabManager = tabManager
			this.nodeTabsWrap.append(tabManager.node).show()
		},
		removeTabManager: function () {
			delete this.tabManager
			this.nodeTabsWrap.empty()
		},
		//ButtonType: Button.Type,
		restore: function(){
			this.btnLeft.restoreAll()
			this.btnRight.restoreAll()
			this.btnCenter.restoreAll()
			return this
		}
	}, [
		['node', ['show','hide'], true]
	])
})

var nav = new AppNav

$(function () {
	//var nodeContent = $('#content')
	//nodeContent.prepend(nav.node)
	app.container.prepend(nav.node)
})

module.exports = nav