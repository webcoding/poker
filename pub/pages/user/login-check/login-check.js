var route = require('route')
var common = require('common')
var inherit = require('inherit')
var nav = require('nav')
var userUtil = require('modules/user/util')

var LoginCheck = inherit({
	name: 'LoginCheck',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('登录检查')
			nav.btnLeft.setText('返回').actionBackToLastPagePermissionNotLogin()

			userUtil.isLogin(true, function(isLogin){
				alert(isLogin)
			})

			this.node = $('')
			this.onDomReady()
		}
	},
	statics: {
		NAME: route.N.LOGIN_CHECK
	}
})