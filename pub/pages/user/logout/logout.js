// 这是一个没有 UI 界面的，功能性的页面
var route = require('route')
var common = require('common')
var inherit = require('inherit')
var nav = require('nav')

var storage = require('storage')
var navUtil = require('navUtil')
var ajax = require('ajax')
var userUtil = require('modules/user/util')

var Logout = inherit({
	name: 'Logout',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			var me = this
			me.__base()

			nav.btnCenter.setText('退出登录')
			nav.btnLeft.setText('返回').actionBack()

			storage.remove(storage.USER_INFO)
			userUtil.cleanCache()

			ajax.getJSON(ajax.API_USER_LOGOUT, function(){
				navUtil.location(route.getPageHome())
			}, function(a,b,error,code,message){
				// 没有权限，说明本身就是非登陆状态
				if(code == 20002){
					navUtil.location(route.getPageHome())
				}
				else{
					me.node = $('注销失败，请刷新重试')
					me.onDomReady()
				}
			})
		}
	},
	statics: {
		NAME: route.N.LOGOUT
	}
})