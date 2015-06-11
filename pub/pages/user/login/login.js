var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var nav = require('nav')
var navUtil = require('navUtil')
var Toast = require('toast')
var tplFn = require('templates/user/login.content.html')
var url = require('url')
var ajax = require('ajax')
var inherit = require('inherit')
var storage = require('storage')
var Action = require('modules/action/action')
var du = require('baiduTongji')

var toast = Toast.getToast()
var qs

var reg = {
	MOBILE: /^\d{11}$/,
	PASSWORD: /.{4,}/
}
var errorMsg = {
	MOBILE_FORMAT: '手机号格式不正确，请重新输入',
	PASSWORD_WRONG: '密码不正确，请重试',
	NOT_EXIST: '用户不存在',
	NET: '网络错误，请重试...',
	OTHER: '登陆失败，请重新试试吧...~'
}

var Login = inherit({
	name: 'Login',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_USER_LOGIN, du.CustomScope.PAGE)

			nav.btnCenter.setText('登录')
			nav.btnLeft.setText('取消').actionBackToLastPagePermissionNotLogin()

			qs = url.parseSearch()

			this.node = $(tplFn({
				route: route,
				redirect: qs.redirect
			}))

			this.nodeForm = $('#form-login', this.node)
			this.inputMobile = $('[name=mobile]', this.nodeForm)
			this.inputPassword = $('[name=password]', this.nodeForm)
			this.nodeButton = $('.submit', this.node)

			Action.add({
				node:$('.forgot-password[data-action]', this.node),
				actionType: 'click'
			})

			this.onFormSubmit = $.proxy(this._onFormSubmit, this)

			this.onDomReady()
		},
		bindEvent: function(){
			this.__base()
			this.nodeForm.on('submit', this.onFormSubmit)
		},
		unbindEvent: function(){
			this.__base()
			this.nodeForm.off('submit', this.onFormSubmit)
		},
		disableButton: function(){
			var me = this
			me.nodeButton.attr('disabled', true).addClass('disabled')
			return me
		},
		enableButton: function(){
			var me = this
			me.nodeButton.removeAttr('disabled', true).removeClass('disabled')
			return me
		},
		_onFormSubmit: function(e){
			var me = this
			e.preventDefault()

			if(me.inputMobile.val().match(reg.MOBILE)){
				if(me.inputPassword.val().match(reg.PASSWORD)){
					var kv = me.nodeForm.serialize()

					me.disableButton()
					me.xrh = ajax.ajax({
						type: 'POST',
						url: ajax.API_USER_LOGIN,
						data: kv,
						success: function(data, status, xhr){
							var usefulUserInfo = data.data
							storage.set(storage.USER_INFO, usefulUserInfo)
							//
							if(qs.redirect){
								navUtil.replace(qs.redirect)
							}
							else{
								navUtil.back()
							}
						},
						error: function(xhr, errorType, error, code, message){
							toast.show(message || (error && error.isStatusError ? errorMsg.NET : errorMsg.OTHER))
						},
						complete: function(){
							me.enableButton()
						}
					})
				}
				else{
					// 登录，只提示失败就好了，不必说什么原因
					toast.show(errorMsg.PASSWORD_WRONG)
				}
			}
			else{
				toast.show(errorMsg.MOBILE_FORMAT)
			}
		}
	},
	statics: {
		NAME: route.N.LOGIN
	}
})