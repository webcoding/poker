// 这是一个没有 UI 界面的，功能性的页面
// 清除所有 localStorage
var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var inherit = require('inherit')

var Clear = inherit({
	name: 'Clear',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('清除所有数据')
			nav.btnLeft.setText('返回').actionBack()

			localStorage.clear()

			navUtil.location(route.getPageHome())
		}
	},
	statics:{
		NAME: route.N.CLEAR
	}
})

