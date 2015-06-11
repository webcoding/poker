var route = require('route')
var common = require('common')
var nav = require('nav')
var inherit = require('inherit')
var storage = require('storage')
var userUtil = require('modules/user/util')
var tplFn = require('templates/user/profile.content.html')
var ajax = require('ajax')
var Toast = require('toast')
var ajaxCache = require('modules/ajax/cache')
var f = require('nunjucksFilter')
var loading = require('loading')
var du = require('baiduTongji')

var toast = Toast.getToast()

var currCity

var Profile = inherit({
	name: 'Profile',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()
			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_USER_PROFILE, du.CustomScope.PAGE)

			nav.btnCenter.setText('个人中心')
			nav.btnLeft.setText('返回').actionBack()
		},
		onShouldUpdate: function(){
			var me = this, error, errorType

			currCity = storage.get(storage.CURR_CITY)

			loading.show()
			me.xhr = userUtil.getProfile(function successCb(data, status, xhr, code, args){
				error = null
			}, function errorCb(xhr, _errorType, _error, code, message, args){
				error = error
				errorType = _errorType
			}, function completeCb(profile, _, args){
				loading.hide()

				if(error && errorType === 'abort'){
					toast.show(message || '网络错误，请重试')
				}
				else if(args.execute_time === 0) {
					var tplContext = {
						profile: profile,
						currCity: currCity.name,
						route: route
					}
					var html = tplFn(tplContext)
					me.node = $(html)

					me.onDomReady()
				}
				else{
					$('.balance-cnt', me.node).html(f.rmb(f.formatPrice(profile.balance)))
				}
			})
		}
	},
	statics: {
		NAME: route.N.PROFILE
	}
})