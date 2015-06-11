var route = require('route')
var common = require('common')
var nav = require('nav')
var ajax = require('ajax')
var storage = require('storage')
var Toast = require('toast')
var url = require('url')
var inherit = require('inherit')
var tplFn = require('templates/user/register.content.html')
var Action = require('modules/action/action')
var du = require('baiduTongji')

var timestamp_register
var params
var qs
var shareCode

var toast = Toast.getToast()

var sucMsg = {
	REG_SUCCESS: '注册成功'
}
var errMsg = {
	PROTOCOL: '阅读并同意用户协议后才能继续哦~'
}

var Register = inherit({
	name: 'Register',
	base: require('../common/BaseRegisterPageClass'),
	proto: {
		onShow: function(options){
			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_USER_REGISTER, du.CustomScope.PAGE)

			timestamp_register = storage.get(storage.TS_REGISTER)

			qs = url.parseSearch()
			params = route.getPathParam(route.R.REGISTER)
			shareCode = params.share_code

			nav.btnCenter.setText('注册')
			if(!shareCode){
				nav.btnLeft.setText('取消').actionBackToLastPagePermissionNotLogin()
				var loginQuerystring = {}
				if(qs.redirect) loginQuerystring.redirect = qs.redirect
				nav.btnRight.setText('登录').setHref(route.getRoute(route.R.LOGIN, loginQuerystring))
			}

			this.qs = qs

			$.extend(this, {
				formId: 'form-register',
				passwordName: 'password',
				authCodeType: 'register',
				shareCode: shareCode,
				toast: toast,
				countDownTimeStamp: timestamp_register,
				NAME_TIMESTAMP: storage.TS_REGISTER,
				MSG_FORM_SUCCESS: sucMsg.REG_SUCCESS,
				API_FORM_SUBMIT: ajax.API_USER_REGISTER,
				html: tplFn({
					route: route,
					shareCode: shareCode,
					redirect: qs.redirect,
					// 使用 语音验证码
					useVoiceCode: ['aileyou', 'kesongfang'].indexOf(qs.subevent_id) >= 0
				})
			})

			this.__base()

			this.nodeProtocol = $('[name=protocol]', this.nodeForm)

			Action.add({
				node:$('.btn-log[data-action]', this.node),
				actionType: 'click'
			})
		},
		_onFormSubmit: function(e){
			var me = this
			var protocol = me.nodeProtocol.attr('checked')
			if(!protocol){
				e.preventDefault()
				me.toast.show(errMsg.PROTOCOL)
				return
			}
			this.__base(e)
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.REGISTER
	}
})