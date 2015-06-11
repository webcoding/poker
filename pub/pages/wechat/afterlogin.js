var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var inherit = require('inherit')
var ajax = require('ajax')
var tplFn = require('templates/wechat/afterlogin.content.html')
var url = require('url')

var qs

var AfterWechatLogin = inherit({
	name: 'AfterWechatLogin',
	base: require('PageViewController'),
	proto: {
		onShow: function () {
			var me = this
			me.__base()

			nav.btnCenter.setText('微信登陆')
			//nav.btnLeft.setText('返回').actionBack()

			qs = url.parseSearch()

			var html = tplFn()
			me.node = $(html)
			me.onDomReady()

			me.login()
		},
		login: function(){
			var me = this
			me.xhr = ajax.getJSON(ajax.API_GET_USERINFO, {
				code: qs.code
			}, success, error)

			function success(data){
				//alert(JSON.stringify(data.data, null, 4))
			}

			function error(){
				//''
			}
		}
	},
	statics: {
		NAME: route.N.AFTER_WECHAT_LOGIN
	}
})